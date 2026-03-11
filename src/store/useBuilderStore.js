import { create } from "zustand";

export const useBuilderStore = create((set, get) => ({
  // Current state
  selectedTemplate: null,
  currentConfig: null,
  selectedElement: null,
  mode: "gallery", // 'gallery' | 'editor'

  // Actions
  selectTemplate: (template) =>
    set({
      selectedTemplate: template,
      currentConfig: JSON.parse(JSON.stringify(template.defaultConfig)),
      mode: "editor",
      selectedElement: null,
    }),

  updatePageConfig: (updates) =>
    set((state) => ({
      currentConfig: {
        ...state.currentConfig,
        page: {
          ...state.currentConfig.page,
          ...updates,
        },
      },
    })),

  updateElementConfig: (elementId, updates) =>
    set((state) => ({
      currentConfig: {
        ...state.currentConfig,
        elements: {
          ...state.currentConfig.elements,
          [elementId]: {
            ...state.currentConfig.elements[elementId],
            ...updates,
          },
        },
      },
    })),

  selectElement: (elementId) => set({ selectedElement: elementId }),

  deselectElement: () => set({ selectedElement: null }),

  resetToGallery: () =>
    set({
      selectedTemplate: null,
      currentConfig: null,
      selectedElement: null,
      mode: "gallery",
    }),

  resetCurrentConfig: () =>
    set((state) => ({
      currentConfig: JSON.parse(
        JSON.stringify(state.selectedTemplate.defaultConfig),
      ),
      selectedElement: null,
    })),

  getConfig: () => get().currentConfig,
  getTemplate: () => get().selectedTemplate,
}));
