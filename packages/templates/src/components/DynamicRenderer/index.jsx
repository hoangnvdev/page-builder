import PropTypes from 'prop-types';

import { Page } from '@page-builder/ui';

import { getComponentForElement } from '../../registries/componentRegistry';

export const DynamicRenderer = ({ templateConfig, config }) => {
  const { page, elements } = config;
  const layout = templateConfig.layout || [];

  if (!layout || layout.length === 0) {
    console.warn("No layout defined in template configuration");
    return null;
  }

  return (
    <Page fontFamily={page.fontFamily}>
      {layout.map((elementKey, index) => {
        const elementConfig = elements[elementKey];

        if (!elementConfig) {
          console.warn(`No config found for element: ${elementKey}`);
          return null;
        }

        const result = getComponentForElement(
          elementKey,
          elementConfig,
          templateConfig,
        );

        if (!result) {
          return null;
        }

        const { component: Component, props } = result;

        return <Component key={`${elementKey}-${index}`} {...props} />;
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
