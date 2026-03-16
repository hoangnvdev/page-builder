import React from "react";

import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";

import { ErrorBoundary, LoadingIndicator } from "@/components";

const LazyDesignPage = React.lazy(() =>
  import("@/pages/Design").then((module) => ({ default: module.DesignPage })),
);
const LazyTemplatePage = React.lazy(() =>
  import("@/pages/Template").then((module) => ({
    default: module.TemplatePage,
  })),
);

export const AppRoutes = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/template" replace />} />
      <Route
        path="/template"
        element={
          <ErrorBoundary fallbackType="page" resetPath="/template">
            <React.Suspense
              fallback={
                <LoadingIndicator
                  title={t("routes.loading.templatePage.title")}
                  description={t("routes.loading.templatePage.description")}
                />
              }
            >
              <LazyTemplatePage />
            </React.Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/design"
        element={
          <ErrorBoundary fallbackType="page" resetPath="/template">
            <React.Suspense
              fallback={
                <LoadingIndicator
                  title={t("routes.loading.designPage.title")}
                  description={t("routes.loading.designPage.description")}
                />
              }
            >
              <LazyDesignPage />
            </React.Suspense>
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
