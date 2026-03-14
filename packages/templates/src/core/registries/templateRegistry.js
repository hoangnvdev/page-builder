import {
  businessLandingConfig,
  classicEleganceConfig,
  comicSplashConfig,
  cyberpunkNeonConfig,
  modernPortfolioConfig,
  sciFiTechConfig,
  swissBrutalistConfig,
} from "@/configs/index.js";
import { createTemplateComponent } from "@/core/hoc/createTemplateComponent.jsx";

export const templateRegistry = [
  // Original templates
  {
    ...modernPortfolioConfig,
    component: createTemplateComponent(modernPortfolioConfig),
  },
  {
    ...businessLandingConfig,
    component: createTemplateComponent(businessLandingConfig),
  },

  // New themed templates
  {
    ...comicSplashConfig,
    component: createTemplateComponent(comicSplashConfig),
  },
  {
    ...cyberpunkNeonConfig,
    component: createTemplateComponent(cyberpunkNeonConfig),
  },
  {
    ...swissBrutalistConfig,
    component: createTemplateComponent(swissBrutalistConfig),
  },
  {
    ...classicEleganceConfig,
    component: createTemplateComponent(classicEleganceConfig),
  },
  {
    ...sciFiTechConfig,
    component: createTemplateComponent(sciFiTechConfig),
  },
];

export const getTemplateById = (id) => {
  return templateRegistry.find((t) => t.id === id);
};
