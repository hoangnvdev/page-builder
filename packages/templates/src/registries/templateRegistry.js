import {
  businessProConfig,
  comicSplashConfig,
  futuristicTechConfig,
  refinedClassicConfig,
} from "../configs";
import { createTemplateComponent } from "../hocs/createTemplateComponent";

export const templateRegistry = [
  {
    ...comicSplashConfig,
    component: createTemplateComponent(comicSplashConfig),
  },
  {
    ...refinedClassicConfig,
    component: createTemplateComponent(refinedClassicConfig),
  },
  {
    ...businessProConfig,
    component: createTemplateComponent(businessProConfig),
  },
  {
    ...futuristicTechConfig,
    component: createTemplateComponent(futuristicTechConfig),
  },
];

export const getTemplateById = (id) => {
  return templateRegistry.find((t) => t.id === id);
};
