import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTemplate: null,
  currentConfig: null,
  selectedElement: null,
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
      state.selectedElement = action.payload;
    },

    deselectElement: (state) => {
      state.selectedElement = null;
    },

    resetToGallery: (state) => {
      state.selectedTemplate = null;
      state.currentConfig = null;
      state.selectedElement = null;
    },

    resetCurrentConfig: (state) => {
      if (state.selectedTemplate) {
        state.currentConfig = JSON.parse(
          JSON.stringify(state.selectedTemplate.defaultConfig),
        );
        state.selectedElement = null;
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
} = builderSlice.actions;

export default builderSlice.reducer;
