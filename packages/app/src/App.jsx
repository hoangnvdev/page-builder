import { BrowserRouter } from 'react-router-dom';

import {
  ErrorBoundary,
  RTLProvider,
} from '@/components';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <ErrorBoundary fallbackType="page" resetPath="/template">
      <RTLProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </RTLProvider>
    </ErrorBoundary>
  );
}

export default App;
