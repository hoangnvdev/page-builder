import { configureStore } from '@reduxjs/toolkit';

import builderReducer from './builderSlice';

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

let saveTimeout;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveState(store.getState());
  }, 1000);
});

window.addEventListener("beforeunload", () => {
  clearTimeout(saveTimeout);
  saveState(store.getState());
});
