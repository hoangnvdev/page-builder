# State Management Guide

**Package**: @page-builder/app
**Last Updated**: March 18, 2026

## Overview

The Page Builder app uses **Redux Toolkit** for centralized state management. This guide covers the Redux architecture, slice design, and best practices.

## Redux Store Architecture

### Store Configuration

The Redux store is configured with localStorage persistence and debouncing for optimal performance.

```javascript
// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import builderReducer from "./builderSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("builderState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const stateToSave = {
      ...state,
      builder: {
        ...state.builder,
        selectedTemplate: state.builder.selectedTemplate
          ? {
              ...state.builder.selectedTemplate,
              component: undefined,
            }
          : null,
      },
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("builderState", serializedState);
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "builder/selectTemplate",
          "builder/rehydrateTemplateComponent",
        ],
        ignoredPaths: ["builder.selectedTemplate.component"],
      },
    }),
});

// Debounced persistence (saves after 1s of inactivity)
let saveTimeout;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveState(store.getState());
  }, 1000);
});

// Save immediately on page close
window.addEventListener("beforeunload", () => {
  clearTimeout(saveTimeout);
  saveState(store.getState());
});
```

**Persistence Strategy:**

- State automatically saves to localStorage after 1 second of inactivity
- Immediate save on page close (`beforeunload`) to prevent data loss
- Component property excluded from serialization to avoid errors
- State automatically rehydrates on page load

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
    // Selected Template
    selectedTemplate: {
      id: 'businessPro',
      name: 'Business Pro',
      description: '...',
      component: ReactComponent, // Not serialized to localStorage
      defaultConfig: { page: {...}, elements: {...} }
    },

    // Current Configuration
    currentConfig: {
      page: {
        title: 'My Page',
        description: '...',
        // ... other page settings
      },
      elements: {
        header: { ... },
        hero: { ... },
        // ... other elements
      }
    },

    // Undo/Redo History (max 50 states)
    history: {
      past: [config1, config2, ...], // Previous states
      future: [config3, config4, ...], // Redo states
    }
  }
}
```

### Slice Implementation

```javascript
// store/builderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const MAX_HISTORY_SIZE = 50;

const initialState = {
  selectedTemplate: null,
  currentConfig: null,
  history: {
    past: [],
    future: [],
  },
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    selectTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
      state.currentConfig = JSON.parse(
        JSON.stringify(action.payload.defaultConfig),
      );
      if (!state.history) {
        state.history = { past: [], future: [] };
      } else {
        state.history.past = [];
        state.history.future = [];
      }
    },

    updatePageConfig: (state, action) => {
      if (state.currentConfig) {
        if (!state.history) {
          state.history = { past: [], future: [] };
        }
        state.history.past.push(
          JSON.parse(JSON.stringify(state.currentConfig)),
        );

        if (state.history.past.length > MAX_HISTORY_SIZE) {
          state.history.past.shift();
        }

        state.history.future = [];

        state.currentConfig.page = {
          ...state.currentConfig.page,
          ...action.payload,
        };
      }
    },

    updateConfig: (state, action) => {
      if (state.currentConfig) {
        if (!state.history) {
          state.history = { past: [], future: [] };
        }
        state.history.past.push(
          JSON.parse(JSON.stringify(state.currentConfig)),
        );

        if (state.history.past.length > MAX_HISTORY_SIZE) {
          state.history.past.shift();
        }

        state.history.future = [];

        state.currentConfig = action.payload;
      }
    },

    updateConfigLive: (state, action) => {
      // For text inputs: updates preview without saving to history
      if (state.currentConfig) {
        if (!state.history) {
          state.history = { past: [], future: [] };
        }
        state.currentConfig = action.payload;
      }
    },

    updateElementConfig: (state, action) => {
      const { elementId, updates } = action.payload;
      if (state.currentConfig) {
        if (!state.history) {
          state.history = { past: [], future: [] };
        }
        state.history.past.push(
          JSON.parse(JSON.stringify(state.currentConfig)),
        );

        if (state.history.past.length > MAX_HISTORY_SIZE) {
          state.history.past.shift();
        }

        state.history.future = [];

        state.currentConfig.elements[elementId] = {
          ...state.currentConfig.elements[elementId],
          ...updates,
        };
      }
    },

    undo: (state) => {
      if (!state.history) {
        state.history = { past: [], future: [] };
        return;
      }
      if (state.history.past.length > 0) {
        state.history.future.push(
          JSON.parse(JSON.stringify(state.currentConfig)),
        );

        if (state.history.future.length > MAX_HISTORY_SIZE) {
          state.history.future.shift();
        }

        state.currentConfig = state.history.past.pop();
      }
    },

    redo: (state) => {
      if (!state.history) {
        state.history = { past: [], future: [] };
        return;
      }
      if (state.history.future.length > 0) {
        state.history.past.push(
          JSON.parse(JSON.stringify(state.currentConfig)),
        );

        if (state.history.past.length > MAX_HISTORY_SIZE) {
          state.history.past.shift();
        }

        state.currentConfig = state.history.future.pop();
      }
    },

    resetToGallery: (state) => {
      state.selectedTemplate = null;
      state.currentConfig = null;
      if (!state.history) {
        state.history = { past: [], future: [] };
      } else {
        state.history.past = [];
        state.history.future = [];
      }
    },

    resetCurrentConfig: (state) => {
      if (state.selectedTemplate) {
        if (!state.history) {
          state.history = { past: [], future: [] };
        }
        state.history.past = [];
        state.history.future = [];

        state.currentConfig = JSON.parse(
          JSON.stringify(state.selectedTemplate.defaultConfig),
        );
      }
    },

    rehydrateTemplateComponent: (state, action) => {
      if (state.selectedTemplate) {
        state.selectedTemplate = {
          ...state.selectedTemplate,
          component: action.payload.component,
          defaultConfig: action.payload.defaultConfig,
        };
      }
    },
  },
});

export const {
  selectTemplate,
  updatePageConfig,
  updateConfig,
  updateConfigLive,
  updateElementConfig,
  undo,
  redo,
  resetToGallery,
  resetCurrentConfig,
  rehydrateTemplateComponent,
} = builderSlice.actions;

export default builderSlice.reducer;
```

## Actions Reference

### Template Actions

**`selectTemplate(template)`**

- Selects a template and initializes config
- Clears history
- Parameters: `{ id, name, component, defaultConfig }`

**`resetToGallery()`**

- Returns to template selection
- Clears all state and history

**`resetCurrentConfig()`**

- Resets config to template defaults
- Clears history without saving

**`rehydrateTemplateComponent(payload)`**

- Updates template component after code split load
- Doesn't affect currentConfig

### Configuration Actions

**`updateConfig(newConfig)`**

- Replaces entire config
- Saves to history
- Deep clones for immutability

**`updateConfigLive(newConfig)`**

- Updates config without history (for text inputs)
- Provides live preview during typing
- Use with `onBlur` to commit to history

**`updatePageConfig(pageUpdates)`**

- Updates only page-level settings
- Saves to history
- Parameters: `{ title, description, ... }`

**`updateElementConfig({ elementId, updates })`**

- Updates specific element
- Saves to history
- Parameters: `{ elementId: 'header', updates: {...} }`

### History Actions

**`undo()`**

- Restores previous state from history
- Moves current to future
- Limited to 50 states

**`redo()`**

- Restores next state from future
- Moves current to past
- Limited to 50 states

## History Management

### Design

The app implements undo/redo with a bidirectional history:

- **Past**: Array of previous states (max 50)
- **Future**: Array of redo states (max 50)
- Uses deep cloning via `JSON.parse(JSON.stringify())` for immutability

### Memory Optimization

```javascript
const MAX_HISTORY_SIZE = 50;

// When adding to history
if (state.history.past.length > MAX_HISTORY_SIZE) {
  state.history.past.shift(); // Remove oldest
}
```

### Text Input Strategy

To avoid history spam during typing:

- `onChange` → `updateConfigLive` (no history, instant preview)
- `onBlur` → `updateConfig` (saves to history)

```jsx
<Input
  value={value}
  onChange={(val) => dispatch(updateConfigLive(newConfig))}
  onBlur={(val) => dispatch(updateConfig(newConfig))}
/>
```

### Keyboard Shortcuts

Handled by `EditorToolbar` component:

- **Ctrl+Z**: Undo
- **Ctrl+Y** or **Ctrl+Shift+Z**: Redo

## Selectors

Optimized selectors for preventing unnecessary re-renders.

```javascript
// In components/HistoryControls/index.jsx
const historyPastLength = useSelector(
  (state) => state.builder.history?.past?.length || 0,
);
const historyFutureLength = useSelector(
  (state) => state.builder.history?.future?.length || 0,
);

// Only fetch full history when popup is open
const history = useSelector((state) =>
  showHistory ? state.builder.history : null,
);
```

**Performance Best Practices:**

- Select only what you need (lengths vs full arrays)
- Conditional selection based on UI state
- Memoize selectors with `useMemo` for derived data

## Usage in Components

### Basic Usage

```jsx
import { useSelector, useDispatch } from "react-redux";
import { updateConfig, undo, redo } from "../store/builderSlice";

function PropertyPanel() {
  const dispatch = useDispatch();
  const currentConfig = useSelector((state) => state.builder.currentConfig);

  const handleFieldChange = (newConfig) => {
    dispatch(updateConfig(newConfig));
  };

  return (
    <div>
      <Input
        value={currentConfig.page.title}
        onChange={(val) =>
          handleFieldChange({
            ...currentConfig,
            page: { ...currentConfig.page, title: val },
          })
        }
      />
    </div>
  );
}
```

### With Text Input Optimization

```jsx
import { updateConfig, updateConfigLive } from "../store/builderSlice";

function PropertyPanel() {
  const dispatch = useDispatch();
  const currentConfig = useSelector((state) => state.builder.currentConfig);

  const handleLiveChange = (newConfig) => {
    dispatch(updateConfigLive(newConfig)); // No history
  };

  const handleCommit = (newConfig) => {
    dispatch(updateConfig(newConfig)); // Save to history
  };

  return (
    <Input
      value={currentConfig.page.title}
      onChange={(val) =>
        handleLiveChange({
          /* new config */
        })
      }
      onBlur={(val) =>
        handleCommit({
          /* new config */
        })
      }
    />
  );
}
```

### History Controls

```jsx
import { undo, redo } from "../store/builderSlice";
import { CornerUpLeft, CornerUpRight, History } from "lucide-react";

function HistoryControls() {
  const dispatch = useDispatch();
  const historyPastLength = useSelector(
    (state) => state.builder.history?.past?.length || 0,
  );
  const historyFutureLength = useSelector(
    (state) => state.builder.history?.future?.length || 0,
  );

  return (
    <div>
      <button
        onClick={() => dispatch(undo())}
        disabled={historyPastLength === 0}
      >
        <CornerUpLeft size={16} />
        Undo
      </button>
      <button
        onClick={() => dispatch(redo())}
        disabled={historyFutureLength === 0}
      >
        <CornerUpRight size={16} />
        Redo
      </button>
    </div>
  );
}
```

## Best Practices

### 1. Deep Cloning

Redux Toolkit uses Immer for immutability, but history requires deep cloning:

```javascript
state.history.past.push(JSON.parse(JSON.stringify(state.currentConfig)));
```

### 2. Selective Updates

Update only what changed to minimize history size:

```javascript
// Good: Update specific element
dispatch(updateElementConfig({ elementId: 'header', updates: {...} }));

// Avoid: Replacing entire config for small changes
dispatch(updateConfig(entireConfig));
```

### 3. History Limits

Always respect MAX_HISTORY_SIZE to prevent memory issues:

```javascript
if (state.history.past.length > MAX_HISTORY_SIZE) {
  state.history.past.shift(); // Remove oldest
}
```

### 4. Live Updates

Use `updateConfigLive` for text inputs to avoid history spam:

```javascript
// onChange: live preview without history
onChange={(val) => dispatch(updateConfigLive(newConfig))}

// onBlur: commit to history
onBlur={(val) => dispatch(updateConfig(newConfig))}
```

### 5. Performance Optimization

Select minimal data to prevent re-renders:

```javascript
// Good: Select only length
const pastLength = useSelector((state) => state.builder.history.past.length);

// Avoid: Select full array when only length is needed
const past = useSelector((state) => state.builder.history.past);
const pastLength = past.length; // Causes re-render on every history change
```

## Related Components

- **HistoryControls**: Undo/redo buttons with dropdown history visualization
- **PropertyPanel**: Property editing with text input optimization
- **EditorToolbar**: Keyboard shortcut handling (Ctrl+Z, Ctrl+Y)

---

**See Also**:

- [EXPORT_SYSTEM.md](./EXPORT_SYSTEM.md) - HTML export functionality
- [../../docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) - Overall architecture
