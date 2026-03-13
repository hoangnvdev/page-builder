import { configureStore } from "@reduxjs/toolkit";

import builderReducer from "./builderSlice";

export const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["builder/selectTemplate"],
        ignoredPaths: ["builder.selectedTemplate.component"],
      },
    }),
});
