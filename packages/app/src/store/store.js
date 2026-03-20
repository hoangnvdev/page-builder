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
    // Get the last committed config from history
    const lastHistoryEntry =
      state.builder.history?.past?.[state.builder.history.past.length - 1];

    // Use last history entry's config if available, otherwise use current config
    // This ensures we only save committed changes, not live updates
    const configToSave = lastHistoryEntry
      ? lastHistoryEntry.config
      : state.builder.currentConfig;

    const stateToSave = {
      ...state,
      builder: {
        ...state.builder,
        currentConfig: configToSave,
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
let previousHistoryLength = 0;

store.subscribe(() => {
  const state = store.getState();
  const currentHistoryLength =
    (state.builder.history?.past?.length || 0) +
    (state.builder.history?.future?.length || 0);

  // Only save when history changes (new entry added or undo/redo)
  if (currentHistoryLength !== previousHistoryLength) {
    previousHistoryLength = currentHistoryLength;

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveState(store.getState());
    }, 300); // Shorter debounce since we only save on history changes
  }
});

window.addEventListener("beforeunload", () => {
  clearTimeout(saveTimeout);
  saveState(store.getState());
});
