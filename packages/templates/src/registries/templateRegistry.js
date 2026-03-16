import {
  businessProConfig,
  comicSplashConfig,
  comicSplashRefactoredConfig,
  futuristicTechConfig,
  refinedClassicRefactoredConfig,
} from "../configs";
import { createTemplateComponent } from "../hocs/createTemplateComponent";

export const templateRegistry = [
  {
    ...comicSplashConfig,
    component: createTemplateComponent(comicSplashConfig),
  },
  {
    ...comicSplashRefactoredConfig,
    component: createTemplateComponent(comicSplashRefactoredConfig),
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
    ...refinedClassicRefactoredConfig,
    component: createTemplateComponent(refinedClassicRefactoredConfig),
  },
];

export const getTemplateById = (id) => {
  return templateRegistry.find((t) => t.id === id);
};
