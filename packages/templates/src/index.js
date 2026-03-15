import {
  businessProConfig,
  comicSplashConfig,
  futuristicTechConfig,
  refinedClassicConfig,
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
  businessProConfig,
  comicSplashConfig,
  futuristicTechConfig,
  refinedClassicConfig,
} from './configs/index.js';

// Pre-built template components
export const ComicSplash = createTemplateComponent(comicSplashConfig);
export const BusinessPro = createTemplateComponent(businessProConfig);
export const FuturisticTech = createTemplateComponent(futuristicTechConfig);
export const RefinedClassic = createTemplateComponent(refinedClassicConfig);
