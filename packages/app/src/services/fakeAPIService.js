import { createElement } from "react";

import { renderToStaticMarkup } from "react-dom/server";

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
  await new Promise((resolve) => setTimeout(resolve, 400));

  // In real scenario, this would be:
  // const response = await fetch(`/api/templates/${templateId}/preview`);
  // return await response.text();

  const template = templateRegistry.find((t) => t.id === templateId);

  if (!template) {
    throw new Error(`Template with id "${templateId}" not found`);
  }

  try {
    // Simulate server-side rendering
    const TemplateComponent = template.component;
    const htmlContent = renderToStaticMarkup(
      createElement(TemplateComponent, { config: template.defaultConfig }),
    );

    // Return complete HTML document
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name} Preview</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: white;
    }
    .preview-container {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="preview-container">
    ${htmlContent}
  </div>
</body>
</html>
    `.trim();
  } catch (error) {
    console.error(`Error rendering template ${templateId}:`, error);
    throw new Error(`Failed to render template preview: ${error.message}`);
  }
};
