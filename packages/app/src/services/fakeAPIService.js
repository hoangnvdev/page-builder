import { templateRegistry } from "@page-builder/templates";

export const fetchTemplatesFromAPI = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  // in real scenario, this would be:
  // const response = await fetch('/api/templates');
  // const data = await response.json();

  // Return lightweight metadata only - heavy config loaded per-preview
  return templateRegistry.map((template) => ({
    id: template.id,
    name: template.name,
    description: template.description,
    icon: template.icon,
    layout: template.layout,
  }));
};

export const fetchTemplateByIdFromAPI = async (templateId) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  // in real scenario, this would be:
  // const response = await fetch(`/api/templates/${templateId}`);
  // const data = await response.json();

  const template = templateRegistry.find((t) => t.id === templateId);

  if (!template) {
    throw new Error(`Template with id "${templateId}" not found`);
  }

  return {
    id: template.id,
    name: template.name,
    description: template.description,
    icon: template.icon,
    layout: template.layout,
    defaultConfig: template.defaultConfig,
    editableFields: template.editableFields,
    configSchema: template.configSchema,
  };
};

export const fetchTemplatePreviewHTML = async (templateId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In production, this would fetch preview data from API:
  // const response = await fetch(`/api/templates/${templateId}/preview`);
  // return await response.json();

  const template = templateRegistry.find((t) => t.id === templateId);

  if (!template) {
    throw new Error(`Template with id "${templateId}" not found`);
  }

  // Return preview metadata (can be extended later with actual preview URLs)
  return {
    id: template.id,
    name: template.name,
    icon: template.icon,
    // Future: Add preview image URL here
    // previewUrl: `/previews/${templateId}.png`,
  };
};
