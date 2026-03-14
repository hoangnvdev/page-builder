import {
  businessProConfig,
  comicSplashConfig,
  futuristicTechConfig,
  refinedClassicConfig,
} from './configs/index.js';
import {
  createTemplateComponent,
} from './core/hoc/createTemplateComponent.jsx';

// Core dynamic rendering system
export {
  componentRegistry,
  createTemplateComponent,
  DynamicRenderer,
  getComponentForElement,
  getTemplateById,
  templateRegistry,
} from './core/index.js';

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
