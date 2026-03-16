# State Management Guide

**Package**: @page-builder/app
**Last Updated**: March 15, 2026

## Overview

The Page Builder app uses **Redux Toolkit** for centralized state management. This guide covers the Redux architecture, slice design, and best practices.

## Redux Store Architecture

### Store Configuration

```javascript
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import builderReducer from './builderSlice';

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    // Add more slices as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['builder/loadTemplate'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.callback'],
        // Ignore these paths in the state
        ignoredPaths: ['builder.nonSerializableValue'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Store Provider

```javascript
// main.jsx
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

## Builder Slice

The main state management for the page builder.

### State Shape

```javascript
{
  builder: {
    // Template Selection
    selectedTemplate: 'businessPro' | 'comicSplash' | null,
    templateConfig: { ...config },

    // Sections
    sections: [
      {
        id: 'section-1',
        type: 'Hero',
        props: {
          title: 'Welcome',
          subtitle: '...',
          // ...
        },
        order: 0,
      },
      // ...
    ],

    // Editing State
    editingSection: 'section-1' | null,
    editingProperty: 'title' | null,

    // History for Undo/Redo
    history: {
      past: [],
      future: [],
    },

    // UI State
    previewMode: 'desktop' | 'tablet' | 'mobile',
    isExporting: false,
    isSaving: false,

    // Theme Customization
    customTheme: {
      colors: { ... },
      fonts: { ... },
    },
  }
}
```

### Slice Implementation

```javascript
// store/builderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { processTemplateConfig } from "../utils/processTemplateConfig";

const initialState = {
  selectedTemplate: null,
  templateConfig: null,
  sections: [],
  editingSection: null,
  editingProperty: null,
  history: {
    past: [],
    future: [],
  },
  previewMode: "desktop",
  isExporting: false,
  isSaving: false,
  customTheme: null,
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    // Template Actions
    selectTemplate(state, action) {
      const { templateId, config } = action.payload;
      state.selectedTemplate = templateId;
      state.templateConfig = processTemplateConfig(config);
      state.sections = config.sections.map((section, index) => ({
        id: `section-${Date.now()}-${index}`,
        ...section,
        order: index,
      }));
      // Reset editing state
      state.editingSection = null;
      state.editingProperty = null;
      // Clear history
      state.history = { past: [], future: [] };
    },

    clearTemplate(state) {
      return initialState;
    },

    // Section Actions
    addSection(state, action) {
      const { type, props, afterId } = action.payload;
      const newSection = {
        id: `section-${Date.now()}`,
        type,
        props: props || {},
        order: state.sections.length,
      };

      // Save to history before mutation
      state.history.past.push(JSON.stringify(state.sections));
      state.history.future = [];

      if (afterId) {
        const index = state.sections.findIndex((s) => s.id === afterId);
        state.sections.splice(index + 1, 0, newSection);
      } else {
        state.sections.push(newSection);
      }

      // Reorder
      state.sections.forEach((s, i) => {
        s.order = i;
      });
    },

    removeSection(state, action) {
      const { id } = action.payload;

      // Save to history
      state.history.past.push(JSON.stringify(state.sections));
      state.history.future = [];

      state.sections = state.sections.filter((s) => s.id !== id);

      // Reorder
      state.sections.forEach((s, i) => {
        s.order = i;
      });

      // Clear editing if removed section was being edited
      if (state.editingSection === id) {
        state.editingSection = null;
        state.editingProperty = null;
      }
    },

    updateSection(state, action) {
      const { id, props } = action.payload;
      const section = state.sections.find((s) => s.id === id);

      if (section) {
        // Save to history
        state.history.past.push(JSON.stringify(state.sections));
        state.history.future = [];

        // Merge props
        section.props = {
          ...section.props,
          ...props,
        };
      }
    },

    reorderSections(state, action) {
      const { startIndex, endIndex } = action.payload;

      // Save to history
      state.history.past.push(JSON.stringify(state.sections));
      state.history.future = [];

      const [removed] = state.sections.splice(startIndex, 1);
      state.sections.splice(endIndex, 0, removed);

      // Update order property
      state.sections.forEach((s, i) => {
        s.order = i;
      });
    },

    duplicateSection(state, action) {
      const { id } = action.payload;
      const section = state.sections.find((s) => s.id === id);

      if (section) {
        // Save to history
        state.history.past.push(JSON.stringify(state.sections));
        state.history.future = [];

        const duplicate = {
          ...section,
          id: `section-${Date.now()}`,
          props: { ...section.props },
        };

        const index = state.sections.findIndex((s) => s.id === id);
        state.sections.splice(index + 1, 0, duplicate);

        // Reorder
        state.sections.forEach((s, i) => {
          s.order = i;
        });
      }
    },

    // Editing Actions
    startEditing(state, action) {
      const { sectionId, property } = action.payload;
      state.editingSection = sectionId;
      state.editingProperty = property || null;
    },

    stopEditing(state) {
      state.editingSection = null;
      state.editingProperty = null;
    },

    // History Actions
    undo(state) {
      if (state.history.past.length > 0) {
        const previous = state.history.past.pop();
        state.history.future.push(JSON.stringify(state.sections));
        state.sections = JSON.parse(previous);
      }
    },

    redo(state) {
      if (state.history.future.length > 0) {
        const next = state.history.future.pop();
        state.history.past.push(JSON.stringify(state.sections));
        state.sections = JSON.parse(next);
      }
    },

    // Preview Mode
    setPreviewMode(state, action) {
      state.previewMode = action.payload;
    },

    // Theme Customization
    updateTheme(state, action) {
      state.customTheme = {
        ...state.customTheme,
        ...action.payload,
      };
    },

    // Export State
    setExporting(state, action) {
      state.isExporting = action.payload;
    },

    // Save State
    setSaving(state, action) {
      state.isSaving = action.payload;
    },
  },
});

export const {
  selectTemplate,
  clearTemplate,
  addSection,
  removeSection,
  updateSection,
  reorderSections,
  duplicateSection,
  startEditing,
  stopEditing,
  undo,
  redo,
  setPreviewMode,
  updateTheme,
  setExporting,
  setSaving,
} = builderSlice.actions;

export default builderSlice.reducer;
```

## Selectors

Create memoized selectors for derived state.

```javascript
// store/selectors.js
import { createSelector } from "@reduxjs/toolkit";

// Base selectors
export const selectBuilder = (state) => state.builder;
export const selectSections = (state) => state.builder.sections;
export const selectEditingSection = (state) => state.builder.editingSection;

// Memoized selectors
export const selectSortedSections = createSelector(
  [selectSections],
  (sections) => {
    return [...sections].sort((a, b) => a.order - b.order);
  },
);

export const selectSectionById = createSelector(
  [selectSections, (state, sectionId) => sectionId],
  (sections, sectionId) => {
    return sections.find((s) => s.id === sectionId);
  },
);

export const selectCanUndo = createSelector(
  [selectBuilder],
  (builder) => builder.history.past.length > 0,
);

export const selectCanRedo = createSelector(
  [selectBuilder],
  (builder) => builder.history.future.length > 0,
);

export const selectSectionsByType = createSelector(
  [selectSections, (state, type) => type],
  (sections, type) => {
    return sections.filter((s) => s.type === type);
  },
);
```

## Usage in Components

### Basic Usage

```jsx
import { useSelector, useDispatch } from "react-redux";
import { updateSection, startEditing } from "../store/builderSlice";

function SectionEditor({ sectionId }) {
  const dispatch = useDispatch();

  // Select data
  const section = useSelector((state) =>
    state.builder.sections.find((s) => s.id === sectionId),
  );

  // Dispatch actions
  const handleUpdate = (props) => {
    dispatch(updateSection({ id: sectionId, props }));
  };

  const handleEdit = () => {
    dispatch(startEditing({ sectionId }));
  };

  return (
    <div onClick={handleEdit}>
      <h3>{section.props.title}</h3>
      <input
        value={section.props.title}
        onChange={(e) => handleUpdate({ title: e.target.value })}
      />
    </div>
  );
}
```

### With Memoized Selectors

```jsx
import { useSelector, useDispatch } from "react-redux";
import {
  selectSortedSections,
  selectCanUndo,
  selectCanRedo,
} from "../store/selectors";
import { undo, redo } from "../store/builderSlice";

function HistoryControls() {
  const dispatch = useDispatch();
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);

  return (
    <div>
      <button onClick={() => dispatch(undo())} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={() => dispatch(redo())} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
}

function SectionList() {
  const sections = useSelector(selectSortedSections);

  return (
    <div>
      {sections.map((section) => (
        <SectionItem key={section.id} section={section} />
      ))}
    </div>
  );
}
```

### With Custom Hooks

```javascript
// hooks/useBuilder.js
import { useSelector, useDispatch } from "react-redux";
import * as builderActions from "../store/builderSlice";
import * as selectors from "../store/selectors";

export function useBuilder() {
  const dispatch = useDispatch();
  const builder = useSelector(selectBuilder);

  return {
    // State
    ...builder,
    sections: useSelector(selectors.selectSortedSections),
    canUndo: useSelector(selectors.selectCanUndo),
    canRedo: useSelector(selectors.selectCanRedo),

    // Actions
    selectTemplate: (id, config) =>
      dispatch(builderActions.selectTemplate({ templateId: id, config })),
    addSection: (type, props, afterId) =>
      dispatch(builderActions.addSection({ type, props, afterId })),
    removeSection: (id) => dispatch(builderActions.removeSection({ id })),
    updateSection: (id, props) =>
      dispatch(builderActions.updateSection({ id, props })),
    undo: () => dispatch(builderActions.undo()),
    redo: () => dispatch(builderActions.redo()),
    // ... other actions
  };
}
```

Usage:

```jsx
function BuilderPage() {
  const { sections, addSection, removeSection, undo, redo } = useBuilder();

  return (
    <div>
      <button onClick={() => addSection("Hero", { title: "New Hero" })}>
        Add Hero
      </button>
      {sections.map((section) => (
        <div key={section.id}>
          {section.type}
          <button onClick={() => removeSection(section.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

## Async Actions

For API calls, use `createAsyncThunk`:

```javascript
// store/builderSlice.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const saveTemplate = createAsyncThunk(
  "builder/saveTemplate",
  async (templateData, { getState, rejectWithValue }) => {
    try {
      const { builder } = getState();
      const response = await api.saveTemplate({
        ...templateData,
        sections: builder.sections,
        theme: builder.customTheme,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loadTemplate = createAsyncThunk(
  "builder/loadTemplate",
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await api.getTemplate(templateId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Add to slice extraReducers
extraReducers: (builder) => {
  builder
    // Save Template
    .addCase(saveTemplate.pending, (state) => {
      state.isSaving = true;
    })
    .addCase(saveTemplate.fulfilled, (state, action) => {
      state.isSaving = false;
      // Handle success
    })
    .addCase(saveTemplate.rejected, (state, action) => {
      state.isSaving = false;
      // Handle error
    })

    // Load Template
    .addCase(loadTemplate.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadTemplate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sections = action.payload.sections;
      state.customTheme = action.payload.theme;
    })
    .addCase(loadTemplate.rejected, (state, action) => {
      state.isLoading = false;
      // Handle error
    });
};
```

Usage in component:

```jsx
import { useDispatch } from "react-redux";
import { saveTemplate, loadTemplate } from "../store/builderSlice";

function SaveButton() {
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      await dispatch(saveTemplate({ name: "My Template" })).unwrap();
      alert("Saved!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return <button onClick={handleSave}>Save</button>;
}
```

## Best Practices

### 1. Keep State Normalized

```javascript
// ❌ Avoid nested structures
{
  sections: [
    { id: 1, subsections: [{ id: 1, items: [...] }] }
  ]
}

// ✅ Use normalized structure
{
  sections: { byId: {...}, allIds: [...] },
  subsections: { byId: {...}, allIds: [...] },
  items: { byId: {...}, allIds: [...] }
}
```

### 2. Use Immer (Built into Redux Toolkit)

```javascript
// Redux Toolkit uses Immer - write "mutating" code safely
updateSection(state, action) {
  const section = state.sections.find(s => s.id === action.payload.id);
  section.props.title = action.payload.title;  // ✅ Looks like mutation, but safe!
}
```

### 3. Memoize Expensive Selectors

```javascript
// ✅ Memoized - only recomputes when dependencies change
export const selectFilteredSections = createSelector(
  [selectSections, selectFilter],
  (sections, filter) => {
    return sections.filter((s) => s.type === filter); // Expensive operation
  },
);
```

### 4. Batch Actions When Needed

```javascript
import { batch } from "react-redux";

function updateMultiple() {
  batch(() => {
    dispatch(updateSection1());
    dispatch(updateSection2());
    dispatch(updateSection3());
  });
  // React renders once ✅
}
```

### 5. Use TypeScript for Type Safety (Optional)

```typescript
interface BuilderState {
  selectedTemplate: string | null;
  sections: Section[];
  editingSection: string | null;
  // ...
}

interface Section {
  id: string;
  type: string;
  props: Record<string, any>;
  order: number;
}
```

---

**See Also**:

- [EXPORT_SYSTEM.md](./EXPORT_SYSTEM.md) - HTML export functionality
- [ROUTING.md](./ROUTING.md) - Routing and navigation
- [/docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) - Overall architecture
