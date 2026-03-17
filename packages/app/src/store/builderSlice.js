import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTemplate: null,
  currentConfig: null,
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
    },

    updatePageConfig: (state, action) => {
      if (state.currentConfig) {
        state.currentConfig.page = {
          ...state.currentConfig.page,
          ...action.payload,
        };
      }
    },

    updateConfig: (state, action) => {
      if (state.currentConfig) {
        state.currentConfig = action.payload;
      }
    },

    updateElementConfig: (state, action) => {
      const { elementId, updates } = action.payload;
      if (state.currentConfig) {
        state.currentConfig.elements[elementId] = {
          ...state.currentConfig.elements[elementId],
          ...updates,
        };
      }
    },

    resetToGallery: (state) => {
      state.selectedTemplate = null;
      state.currentConfig = null;
    },

    resetCurrentConfig: (state) => {
      if (state.selectedTemplate) {
        state.currentConfig = JSON.parse(
          JSON.stringify(state.selectedTemplate.defaultConfig),
        );
      }
    },

    rehydrateTemplateComponent: (state, action) => {
      // Only update the template component without resetting config
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
  updateElementConfig,
  resetToGallery,
  resetCurrentConfig,
  rehydrateTemplateComponent,
} = builderSlice.actions;

export default builderSlice.reducer;
