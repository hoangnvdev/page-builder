import {
  businessProConfig,
  comicSplashConfig,
  futuristicTechConfig,
  refinedClassicConfig,
} from '../../configs';
import { createTemplateComponent } from '../hoc/createTemplateComponent';

export const templateRegistry = [
  {
    ...comicSplashConfig,
    component: createTemplateComponent(comicSplashConfig),
  },
  {
    ...businessProConfig,
    component: createTemplateComponent(businessProConfig),
  },
  {
    ...futuristicTechConfig,
    component: createTemplateComponent(futuristicTechConfig),
  },
  {
    ...refinedClassicConfig,
    component: createTemplateComponent(refinedClassicConfig),
  },
];

export const getTemplateById = (id) => {
  return templateRegistry.find((t) => t.id === id);
};
