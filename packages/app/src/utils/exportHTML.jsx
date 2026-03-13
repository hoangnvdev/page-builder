import { renderToStaticMarkup } from "react-dom/server";

export const exportToHTML = (TemplateComponent, config, templateName) => {
  // Render the template to static HTML
  const htmlContent = renderToStaticMarkup(
    <TemplateComponent config={config} />,
  );

  // Create complete HTML document
  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateName}</title>
  <style>
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

    /* Remove data attributes used for editing */
    [data-element] {
      cursor: default !important;
    }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;

  // Remove data-element attributes used for selection
  const cleanedHTML = fullHTML.replace(/data-element="[^"]*"/g, "");

  return cleanedHTML;
};

export const downloadHTML = (htmlContent, filename = "page.html") => {
  // Create blob from HTML content
  const blob = new Blob([htmlContent], { type: "text/html" });

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
