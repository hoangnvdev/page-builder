import { generateHistoryId } from "@/utils";
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

        // Add current config to history with UUID and metadata
        state.history.past.push({
          id: generateHistoryId(),
          config: JSON.parse(JSON.stringify(state.currentConfig)),
          timestamp: Date.now(),
          action: "updatePageConfig",
          label: "Page configuration updated",
        });

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

        // Add current config to history with UUID and metadata
        state.history.past.push({
          id: generateHistoryId(),
          config: JSON.parse(JSON.stringify(state.currentConfig)),
          timestamp: Date.now(),
          action: "updateConfig",
          label: "Configuration updated",
        });

        if (state.history.past.length > MAX_HISTORY_SIZE) {
          state.history.past.shift();
        }

        state.history.future = [];

        state.currentConfig = action.payload;
      }
    },

    updateConfigLive: (state, action) => {
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

        // Add current config to history with UUID and metadata
        state.history.past.push({
          id: generateHistoryId(),
          config: JSON.parse(JSON.stringify(state.currentConfig)),
          timestamp: Date.now(),
          action: "updateElementConfig",
          label: `Updated element: ${elementId}`,
          elementId, // Store which element was updated
        });

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
        // Add current config to future with UUID and metadata
        state.history.future.push({
          id: generateHistoryId(),
          config: JSON.parse(JSON.stringify(state.currentConfig)),
          timestamp: Date.now(),
          action: "undo",
          label: "Undo action",
        });

        if (state.history.future.length > MAX_HISTORY_SIZE) {
          state.history.future.shift();
        }

        const previousEntry = state.history.past.pop();
        // Extract config from entry (supports both old and new format)
        state.currentConfig = previousEntry.config || previousEntry;
      }
    },

    redo: (state) => {
      if (!state.history) {
        state.history = { past: [], future: [] };
        return;
      }
      if (state.history.future.length > 0) {
        // Add current config to past with UUID and metadata
        state.history.past.push({
          id: generateHistoryId(),
          config: JSON.parse(JSON.stringify(state.currentConfig)),
          timestamp: Date.now(),
          action: "redo",
          label: "Redo action",
        });

        if (state.history.past.length > MAX_HISTORY_SIZE) {
          state.history.past.shift();
        }

        const nextEntry = state.history.future.pop();
        // Extract config from entry (supports both old and new format)
        state.currentConfig = nextEntry.config || nextEntry;
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
