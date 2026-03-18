import { memo } from "react";

import PropTypes from "prop-types";

import { ErrorBoundary } from "@/components";

// Memoized template wrapper to prevent re-renders when only selection changes
export const TemplateRenderer = memo(({ Component, config, t }) => {
  return (
    <ErrorBoundary mode="component" t={t}>
      <Component config={config} />
    </ErrorBoundary>
  );
});

TemplateRenderer.displayName = "TemplateRenderer";
TemplateRenderer.propTypes = {
  Component: PropTypes.elementType.isRequired,
  config: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};
