import React from 'react';

import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import {
  ErrorBoundary,
  RTLProvider,
} from '@/components';
import { SelectionProvider } from '@/contexts/SelectionContext';
import { AppRoutes } from '@/routes';

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary mode="page" resetPath="/template" t={t}>
      <RTLProvider>
        <SelectionProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SelectionProvider>
      </RTLProvider>
    </ErrorBoundary>
  );
}

export default App;
