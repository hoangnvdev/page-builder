import { renderToStaticMarkup } from "react-dom/server";

const BASE_RESET_STYLES = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [data-element] {
    cursor: default !important;
  }
`;

const DATA_ELEMENT_PATTERN = /data-element="[^"]*"/g;
const DEFAULT_FILENAME = "page.html";
const HTML_MIME_TYPE = "text/html";

const extractStylesFromDocument = () => {
  const cssRules = [];

  for (const styleSheet of document.styleSheets) {
    try {
      if (styleSheet.cssRules) {
        for (const rule of styleSheet.cssRules) {
          cssRules.push(rule.cssText);
        }
      }
    } catch (error) {
      // Cross-origin stylesheets will throw - skip them
      console.warn("Unable to access stylesheet:", styleSheet.href, error);
    }
  }

  return cssRules.join("\n");
};

const generateStyles = (componentStyles) => {
  return `${BASE_RESET_STYLES}\n${componentStyles}`;
};

const buildHTMLDocument = (title, styles, bodyContent) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${styles}</style>
</head>
<body>
${bodyContent}
</body>
</html>`;
};

const removeEditorAttributes = (html) => {
  return html.replace(DATA_ELEMENT_PATTERN, "");
};

const renderComponentToHTML = (TemplateComponent, config) => {
  return renderToStaticMarkup(<TemplateComponent config={config} />);
};

export const exportToHTML = (TemplateComponent, config, templateName) => {
  const bodyContent = renderComponentToHTML(TemplateComponent, config);
  const componentStyles = extractStylesFromDocument();
  const allStyles = generateStyles(componentStyles);
  // Use page title from config if available, fallback to template name
  const pageTitle = config?.page?.title || templateName;
  const htmlDocument = buildHTMLDocument(pageTitle, allStyles, bodyContent);
  const cleanedHTML = removeEditorAttributes(htmlDocument);

  return cleanedHTML;
};

export const downloadHTML = (htmlContent, filename = DEFAULT_FILENAME) => {
  const blob = new Blob([htmlContent], { type: HTML_MIME_TYPE });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
