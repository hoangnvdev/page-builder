import { memo } from 'react';

import PropTypes from 'prop-types';

import {
  ErrorBoundary,
  Page,
} from '@page-builder/ui';

import { getComponentForElement } from '../../registries/componentRegistry';

// Memoized section wrapper - only re-renders when this specific section's config changes
const MemoizedSection = memo(
  ({ elementKey, elementConfig, templateConfig, onError }) => {
    console.log(`🔄 Section "${elementKey}" render`);

    const result = getComponentForElement(
      elementKey,
      elementConfig,
      templateConfig,
    );

    if (!result) {
      return null;
    }

    const { component: Component, props } = result;

    return (
      <ErrorBoundary
        mode="component"
        componentName={elementKey}
        onError={(error, errorInfo) => onError(error, errorInfo, elementKey)}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  },
  // Custom comparison function - only re-render if elementConfig actually changed
  (prevProps, nextProps) => {
    // Compare elementConfig deeply
    const configChanged =
      JSON.stringify(prevProps.elementConfig) !==
      JSON.stringify(nextProps.elementConfig);
    const templateChanged =
      prevProps.templateConfig.id !== nextProps.templateConfig.id;

    // Return true if props are equal (prevent re-render)
    // Return false if props changed (allow re-render)
    return !configChanged && !templateChanged;
  },
);

MemoizedSection.displayName = "MemoizedSection";
MemoizedSection.propTypes = {
  elementKey: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  templateConfig: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired,
};

export const DynamicRenderer = ({ templateConfig, config }) => {
  console.log("🎨 DynamicRenderer render");
  const { page, elements } = config;
  const layout = templateConfig.layout || [];

  if (!layout || layout.length === 0) {
    console.warn("No layout defined in template configuration");
    return null;
  }

  const handleComponentError = (error, errorInfo, componentName) => {
    console.error(
      `Template: ${templateConfig.id} - Component: ${componentName} - Error:`,
      error,
    );

    // TODO: Send to error tracking service
    // Example: trackComponentError({ templateId: templateConfig.id, componentName, error, errorInfo });
  };

  return (
    <Page fontFamily={page.fontFamily}>
      {layout.map((elementKey, index) => {
        const elementConfig = elements[elementKey];

        if (!elementConfig) {
          console.warn(`No config found for element: ${elementKey}`);
          return null;
        }

        return (
          <MemoizedSection
            key={`${elementKey}-${index}`}
            elementKey={elementKey}
            elementConfig={elementConfig}
            templateConfig={templateConfig}
            onError={handleComponentError}
          />
        );
      })}
    </Page>
  );
};

DynamicRenderer.propTypes = {
  templateConfig: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    layout: PropTypes.arrayOf(PropTypes.string).isRequired,
    navLinks: PropTypes.array,
  }).isRequired,
  config: PropTypes.shape({
    page: PropTypes.shape({
      fontFamily: PropTypes.string,
      backgroundColor: PropTypes.string,
      textColor: PropTypes.string,
    }).isRequired,
    elements: PropTypes.object.isRequired,
  }).isRequired,
};
