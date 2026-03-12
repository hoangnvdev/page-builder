import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { DesignPage, TemplatePage } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/template" replace />} />
      <Route path="/template" element={<TemplatePage />} />
      <Route path="/design" element={<DesignPage />} />
    </Routes>
  );
};
