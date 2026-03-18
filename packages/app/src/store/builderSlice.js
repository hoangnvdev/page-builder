import { createSlice } from '@reduxjs/toolkit';

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
