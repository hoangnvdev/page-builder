import { withErrorBoundary } from "@/hocs";

import { TemplateGallery } from "../../components/templates/TemplateGallery";

const TemplatePageComponent = () => {
  return <TemplateGallery />;
};

export const TemplatePage = withErrorBoundary(TemplatePageComponent, {
  fallbackType: "component",
});
