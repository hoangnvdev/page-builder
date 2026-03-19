import React from "react";

import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary, RTLProvider } from "@/components";
import { ModalProvider, SelectionProvider, ThemeProvider } from "@/contexts";
import { AppRoutes } from "@/routes";

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary mode="page" resetPath="/template" t={t}>
      <ThemeProvider>
        <ModalProvider>
          <RTLProvider>
            <SelectionProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </SelectionProvider>
          </RTLProvider>
        </ModalProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
