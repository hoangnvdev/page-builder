import React from "react";

import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { ErrorBoundary, LoadingIndicator } from "@/components";
import { useScrollToTopOnRouteChange } from "@/hooks";

const LazyDesignPage = React.lazy(() =>
  import("@/pages/Design").then((module) => ({ default: module.DesignPage })),
);
const LazyTemplatePage = React.lazy(() =>
  import("@/pages/Template").then((module) => ({
    default: module.TemplatePage,
  })),
);
const LazyNotFoundPage = React.lazy(() =>
  import("@/pages/NotFound").then((module) => ({
    default: module.NotFoundPage,
  })),
);

export const AppRoutes = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Scroll to top on route change
  useScrollToTopOnRouteChange(location.pathname);

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
      <Route
        path="*"
        element={
          <React.Suspense fallback={<div />}>
            <LazyNotFoundPage />
          </React.Suspense>
        }
      />
    </Routes>
  );
};
