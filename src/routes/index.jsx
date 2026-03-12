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

const RoutingLoading = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#fafafa",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "4px solid #e0e0e0",
          borderTopColor: "#667eea",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <div
        style={{
          marginTop: "20px",
          color: "#595959",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        One moment...
      </div>
    </div>
    <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

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
