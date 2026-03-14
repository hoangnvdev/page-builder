import { createTemplateComponent } from "@page-builder/templates";

export const processTemplateConfig = (config) => {
  if (!config.id || !config.layout || !config.defaultConfig) {
    throw new Error("Invalid template configuration");
  }

  return {
    ...config,
    component: createTemplateComponent(config),
  };
};
