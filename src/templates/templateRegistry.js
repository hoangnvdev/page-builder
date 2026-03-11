import { BusinessLanding, businessLandingConfig } from "./BusinessLanding";
import { ModernPortfolio, modernPortfolioConfig } from "./ModernPortfolio";

export const templateRegistry = [
  {
    ...modernPortfolioConfig,
    component: ModernPortfolio,
  },
  {
    ...businessLandingConfig,
    component: BusinessLanding,
  },
];

export const getTemplateById = (id) => {
  return templateRegistry.find((t) => t.id === id);
};
