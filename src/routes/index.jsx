import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

const LazyDesignPage = React.lazy(() =>
  import("../pages/Design").then((module) => ({ default: module.DesignPage })),
);
const LazyTemplatePage = React.lazy(() =>
  import("../pages/Template").then((module) => ({
    default: module.TemplatePage,
  })),
);

const RoutingLoading = () => <div>Loading...</div>;

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/template" replace />} />
      <Route
        path="/template"
        element={
          <React.Suspense fallback={<RoutingLoading />}>
            <LazyTemplatePage />
          </React.Suspense>
        }
      />
      <Route
        path="/design"
        element={
          <React.Suspense fallback={<RoutingLoading />}>
            <LazyDesignPage />
          </React.Suspense>
        }
      />
    </Routes>
  );
};
