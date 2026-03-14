import { configureStore } from "@reduxjs/toolkit";

import builderReducer from "./builderSlice";

// Load persisted state from localStorage
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

// Save state to localStorage (excluding non-serializable component)
const saveState = (state) => {
  try {
    // Create a copy of state without the component property
    const stateToSave = {
      ...state,
      builder: {
        ...state.builder,
        selectedTemplate: state.builder.selectedTemplate
          ? {
              ...state.builder.selectedTemplate,
              component: undefined, // Don't serialize the React component
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
        ignoredActions: ["builder/selectTemplate"],
        ignoredPaths: ["builder.selectedTemplate.component"],
      },
    }),
});

// Subscribe to store changes and persist to localStorage
store.subscribe(() => {
  saveState(store.getState());
});
