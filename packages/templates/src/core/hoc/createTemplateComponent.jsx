import PropTypes from "prop-types";

import { DynamicRenderer } from "../components/DynamicRenderer.jsx";

export const createTemplateComponent = (templateConfig) => {
  const TemplateComponent = ({ config }) => {
    return <DynamicRenderer templateConfig={templateConfig} config={config} />;
  };

  TemplateComponent.displayName = templateConfig.name || templateConfig.id;

  TemplateComponent.propTypes = {
    config: PropTypes.shape({
      page: PropTypes.shape({
        fontFamily: PropTypes.string,
        backgroundColor: PropTypes.string,
        textColor: PropTypes.string,
      }).isRequired,
      elements: PropTypes.object.isRequired,
    }).isRequired,
  };

  return TemplateComponent;
};
