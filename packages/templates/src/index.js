import {
  businessLandingConfig,
  modernPortfolioConfig,
} from "./configs/index.js";
// Legacy exports for backward compatibility
import { createTemplateComponent } from "./core/hoc/createTemplateComponent.jsx";

// Core dynamic rendering system
export {
  componentRegistry,
  createTemplateComponent,
  DynamicRenderer,
  getComponentForElement,
  getTemplateById,
  templateRegistry,
} from "./core/index.js";

// Template configs (for direct access if needed)
export {
  businessLandingConfig,
  classicEleganceConfig,
  comicSplashConfig,
  cyberpunkNeonConfig,
  modernPortfolioConfig,
  sciFiTechConfig,
  swissBrutalistConfig,
} from "./configs/index.js";

export const ModernPortfolio = createTemplateComponent(modernPortfolioConfig);
export const BusinessLanding = createTemplateComponent(businessLandingConfig);
