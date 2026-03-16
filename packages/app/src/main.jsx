import "@page-builder/ui/styles";
import "@page-builder/templates/styles";
import "./global.scss";

import { StrictMode } from "react";

import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import App from "@/App";
import { ErrorBoundaryWithoutI18n } from "@/components";
import i18n from "@/i18n";
import { store } from "@/store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundaryWithoutI18n fallbackType="page">
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </ErrorBoundaryWithoutI18n>
  </StrictMode>,
);
