import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTemplate: null,
  currentConfig: null,
  selectedElement: null, // e.g., "hero", "header" - the section being edited
  selectedSubElement: null, // e.g., "hero.title", "hero.button" - specific nested element within section
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
      state.selectedElement = null;
      state.selectedSubElement = null;
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

    selectElement: (state, action) => {
      const elementId = action.payload;

      // Check if this is a nested element (e.g., "hero.title", "header.companyName")
      if (elementId && elementId.includes(".")) {
        const parts = elementId.split(".");
        state.selectedElement = parts[0]; // e.g., "hero"
        state.selectedSubElement = elementId; // e.g., "hero.title"
      } else {
        // Top-level element selection (just section)
        state.selectedElement = elementId;
        state.selectedSubElement = null;
      }
    },

    deselectElement: (state) => {
      state.selectedElement = null;
      state.selectedSubElement = null;
    },

    resetToGallery: (state) => {
      state.selectedTemplate = null;
      state.currentConfig = null;
      state.selectedElement = null;
      state.selectedSubElement = null;
    },

    resetCurrentConfig: (state) => {
      if (state.selectedTemplate) {
        state.currentConfig = JSON.parse(
          JSON.stringify(state.selectedTemplate.defaultConfig),
        );
        state.selectedElement = null;
        state.selectedSubElement = null;
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
  selectElement,
  deselectElement,
  resetToGallery,
  resetCurrentConfig,
  rehydrateTemplateComponent,
} = builderSlice.actions;

export default builderSlice.reducer;
