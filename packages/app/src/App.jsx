import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { RTLProvider } from '@/components';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <RTLProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RTLProvider>
  );
}

export default App;
