import { configureStore } from '@reduxjs/toolkit';

import builderReducer from './builderSlice';

export const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['builder/selectTemplate'],
        // Ignore these paths in the state
        ignoredPaths: ['builder.selectedTemplate.component'],
      },
    }),
});
