import {
  businessProRefactoredConfig,
  comicSplashRefactoredConfig,
  futuristicTechRefactoredConfig,
  refinedClassicRefactoredConfig,
} from '../configs';
import { createTemplateComponent } from '../hocs/createTemplateComponent';

export const templateRegistry = [
  {
    ...comicSplashRefactoredConfig,
    component: createTemplateComponent(comicSplashRefactoredConfig),
  },
  {
    ...refinedClassicRefactoredConfig,
    component: createTemplateComponent(refinedClassicRefactoredConfig),
  },
  {
    ...businessProRefactoredConfig,
    component: createTemplateComponent(businessProRefactoredConfig),
  },
  {
    ...futuristicTechRefactoredConfig,
    component: createTemplateComponent(futuristicTechRefactoredConfig),
  },
];

export const getTemplateById = (id) => {
  return templateRegistry.find((t) => t.id === id);
};
