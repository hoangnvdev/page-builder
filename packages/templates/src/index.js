import {
  businessProRefactoredConfig,
  comicSplashRefactoredConfig,
  futuristicTechRefactoredConfig,
  refinedClassicRefactoredConfig,
} from './configs/index.js';
import { createTemplateComponent } from './hocs/index.js';

// Core dynamic rendering system
export { DynamicRenderer } from './components/index.js';
export {
  componentRegistry,
  getComponentForElement,
  getTemplateById,
  templateRegistry,
} from './registries/index.js';
export { createTemplateComponent } from './hocs/index.js';

// Template configs (for direct access if needed)
export {
  businessProRefactoredConfig,
  comicSplashRefactoredConfig,
  futuristicTechRefactoredConfig,
  refinedClassicRefactoredConfig,
} from './configs/index.js';

// Pre-built template components
export const ComicSplash = createTemplateComponent(comicSplashRefactoredConfig);
export const RefinedClassic = createTemplateComponent(
  refinedClassicRefactoredConfig,
);
export const BusinessPro = createTemplateComponent(businessProRefactoredConfig);
export const FuturisticTech = createTemplateComponent(
  futuristicTechRefactoredConfig,
);

// Locales export for i18n integration
export { default as localesEnEN } from './locales/en-EN.json';
export { default as localesVnVN } from './locales/vn-VN.json';
export { default as localesJaJP } from './locales/ja-JP.json';
export { default as localesArAR } from './locales/ar-AR.json';
