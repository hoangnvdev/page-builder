import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { LoadingIndicator } from "@/components";

const LazyDesignPage = React.lazy(() =>
  import("@/pages/Design").then((module) => ({ default: module.DesignPage })),
);
const LazyTemplatePage = React.lazy(() =>
  import("@/pages/Template").then((module) => ({
    default: module.TemplatePage,
  })),
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/template" replace />} />
      <Route
        path="/template"
        element={
          <React.Suspense
            fallback={
              <LoadingIndicator
                title="We're preparing your templates..."
                description="One moment..."
              />
            }
          >
            <LazyTemplatePage />
          </React.Suspense>
        }
      />
      <Route
        path="/design"
        element={
          <React.Suspense
            fallback={
              <LoadingIndicator
                title="We're preparing your design workspace..."
                description="One moment..."
              />
            }
          >
            <LazyDesignPage />
          </React.Suspense>
        }
      />
    </Routes>
  );
};
