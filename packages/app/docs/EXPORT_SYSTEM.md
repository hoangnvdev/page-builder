# HTML Export System

**Package**: @page-builder/app
**Last Updated**: March 15, 2026

## Overview

The HTML export system converts the current builder state (sections, theme, content) into production-ready static HTML files that can be deployed anywhere.

## Architecture

```
Builder State (Redux)
        ↓
  exportHTML()
        ↓
React Components → HTML Strings (ReactDOMServer)
        ↓
  Extract & Inline CSS
        ↓
  Bundle Assets
        ↓
  Generate Complete HTML
        ↓
  Download as .zip
```

## Implementation

### Main Export Function

```javascript
// utils/exportHTML.jsx
import ReactDOMServer from "react-dom/server";
import { DynamicRenderer } from "@page-builder/templates";

export async function exportHTML(builderState) {
  const { sections, customTheme, selectedTemplate } = builderState;

  // 1. Create config from state
  const config = {
    name: selectedTemplate,
    theme: customTheme,
    sections: sections.map((section) => ({
      type: section.type,
      props: section.props,
    })),
  };

  // 2. Render to HTML string
  const htmlContent = ReactDOMServer.renderToStaticMarkup(
    <DynamicRenderer config={config} />,
  );

  // 3. Extract CSS
  const css = await extractCSS();

  // 4. Generate complete HTML document
  const fullHTML = generateHTMLDocument(htmlContent, css);

  // 5. Create downloadable file
  downloadFile(fullHTML, `${selectedTemplate}.html`);

  return fullHTML;
}
```

### Rendering to Static HTML

```javascript
import ReactDOMServer from "react-dom/server";

function renderToHTML(config) {
  // renderToStaticMarkup = no React hydration attributes
  const html = ReactDOMServer.renderToStaticMarkup(
    <DynamicRenderer config={config} />,
  );

  return html;
}

// Output:
// <section class="hero">
//   <h1>Welcome</h1>
//   <p>...</p>
// </section>
```

### CSS Extraction

```javascript
async function extractCSS() {
  // Collect all stylesheets loaded in the page
  const stylesheets = Array.from(document.styleSheets);

  let css = "";

  for (const sheet of stylesheets) {
    try {
      // Get CSS rules from each sheet
      const rules = Array.from(sheet.cssRules || []);
      css += rules.map((rule) => rule.cssText).join("\n");
    } catch (e) {
      // Cross-origin stylesheets might be blocked
      console.warn("Cannot access stylesheet:", e);
    }
  }

  // Minify CSS
  css = minifyCSS(css);

  return css;
}

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/\s*([{}:;,])\s*/g, "$1") // Remove space around delimiters
    .trim();
}
```

### HTML Document Generation

```javascript
function generateHTMLDocument(bodyContent, css) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Page Builder Export</title>
  <style>
    /* Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Base styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
    }

    /* Extracted component styles */
    ${css}
  </style>
</head>
<body>
  ${bodyContent}

  <!-- Optional: Add minimal JS for interactions -->
  <script>
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  </script>
</body>
</html>`;
}
```

### File Download

```javascript
function downloadFile(content, filename) {
  // Create blob from HTML string
  const blob = new Blob([content], { type: "text/html" });

  // Create download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Trigger download
  document.body.appendChild(a);
  a.click();

  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

## Complete Export Implementation

```javascript
// utils/exportHTML.jsx
import ReactDOMServer from "react-dom/server";
import { DynamicRenderer } from "@page-builder/templates";

export class HTMLExporter {
  constructor(builderState) {
    this.state = builderState;
  }

  async export() {
    // Show loading
    this.showProgress("Preparing export...");

    try {
      // 1. Prepare config
      const config = this.prepareConfig();

      // 2. Render HTML
      this.showProgress("Rendering components...");
      const html = this.renderToHTML(config);

      // 3. Extract CSS
      this.showProgress("Extracting styles...");
      const css = await this.extractCSS();

      // 4. Process images
      this.showProgress("Processing images...");
      const images = await this.processImages(html);

      // 5. Generate document
      this.showProgress("Generating HTML...");
      const fullHTML = this.generateDocument(html, css, images);

      // 6. Create package
      this.showProgress("Creating package...");
      const files = this.createPackage(fullHTML, images);

      // 7. Download
      this.showProgress("Downloading...");
      await this.downloadPackage(files);

      this.showProgress("Export complete!");

      return fullHTML;
    } catch (error) {
      console.error("Export error:", error);
      throw error;
    }
  }

  prepareConfig() {
    const { sections, customTheme, selectedTemplate } = this.state;

    return {
      name: selectedTemplate,
      theme: customTheme || {},
      sections: sections.map((section) => ({
        type: section.type,
        props: this.sanitizeProps(section.props),
      })),
    };
  }

  sanitizeProps(props) {
    // Remove non-serializable props (functions, symbols, etc.)
    return JSON.parse(JSON.stringify(props));
  }

  renderToHTML(config) {
    return ReactDOMServer.renderToStaticMarkup(
      <DynamicRenderer config={config} />,
    );
  }

  async extractCSS() {
    const stylesheets = Array.from(document.styleSheets);
    let css = "";

    for (const sheet of stylesheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        css += rules.map((rule) => rule.cssText).join("\n");
      } catch (e) {
        console.warn("Cannot access stylesheet:", e);
      }
    }

    return this.minifyCSS(css);
  }

  minifyCSS(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .trim();
  }

  async processImages(html) {
    // Find all image URLs in HTML
    const imageUrls = this.extractImageURLs(html);

    // Download and convert to base64
    const images = {};
    for (const url of imageUrls) {
      if (url.startsWith("http")) {
        images[url] = await this.imageToBase64(url);
      }
    }

    return images;
  }

  extractImageURLs(html) {
    const regex = /<img[^>]+src="([^">]+)"/g;
    const urls = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      urls.push(match[1]);
    }

    return [...new Set(urls)]; // Remove duplicates
  }

  async imageToBase64(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Failed to convert image:", url, error);
      return url; // Return original URL as fallback
    }
  }

  generateDocument(html, css, images) {
    // Replace image URLs with base64
    let processedHTML = html;
    Object.entries(images).forEach(([url, base64]) => {
      processedHTML = processedHTML.replace(new RegExp(url, "g"), base64);
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Created with Page Builder">
  <title>${this.state.selectedTemplate || "My Page"}</title>
  <style>${css}</style>
</head>
<body>
  ${processedHTML}
  <script>
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  </script>
</body>
</html>`;
  }

  createPackage(html, images) {
    return {
      "index.html": html,
      // Could include separate CSS/JS files if needed
    };
  }

  async downloadPackage(files) {
    if (Object.keys(files).length === 1) {
      // Single file - direct download
      this.downloadFile(files["index.html"], "index.html");
    } else {
      // Multiple files - create zip
      await this.downloadZip(files);
    }
  }

  downloadFile(content, filename) {
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async downloadZip(files) {
    // Use JSZip library
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    Object.entries(files).forEach(([filename, content]) => {
      zip.file(filename, content);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    this.downloadFile(blob, `${this.state.selectedTemplate}.zip`);
  }

  showProgress(message) {
    // Update UI with progress
    console.log(message);
    // dispatch(updateExportStatus(message));
  }
}

// Usage
export async function exportHTML(builderState) {
  const exporter = new HTMLExporter(builderState);
  return await exporter.export();
}
```

## Usage in Components

```jsx
import { useSelector, useDispatch } from "react-redux";
import { exportHTML } from "../utils/exportHTML";
import { setExporting } from "../store/builderSlice";

function ExportButton() {
  const dispatch = useDispatch();
  const builderState = useSelector((state) => state.builder);
  const isExporting = useSelector((state) => state.builder.isExporting);

  const handleExport = async () => {
    try {
      dispatch(setExporting(true));
      await exportHTML(builderState);
      alert("Export successful!");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      dispatch(setExporting(false));
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting || !builderState.selectedTemplate}
    >
      {isExporting ? "Exporting..." : "Export HTML"}
    </button>
  );
}
```

## Optimization Techniques

### 1. Critical CSS Extraction

Only include CSS that's actually used:

```javascript
function extractCriticalCSS(html, allCSS) {
  const usedSelectors = new Set();

  // Parse HTML to find used classes/IDs
  const classRegex = /class="([^"]+)"/g;
  let match;
  while ((match = classRegex.exec(html)) !== null) {
    match[1].split(" ").forEach((cls) => usedSelectors.add(`.${cls}`));
  }

  // Filter CSS rules
  const criticalCSS = filterCSSRules(allCSS, usedSelectors);

  return criticalCSS;
}
```

### 2. Image Optimization

```javascript
async function optimizeImage(blob) {
  // Resize large images
  if (blob.size > 500000) {
    // > 500KB
    return await resizeImage(blob, { maxWidth: 1920, quality: 0.85 });
  }
  return blob;
}
```

### 3. HTML Minification

```javascript
function minifyHTML(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/>\s+</g, "><") // Remove space between tags
    .trim();
}
```

## Export Presets

```javascript
const EXPORT_PRESETS = {
  minimal: {
    inlineImages: true,
    minifyHTML: true,
    minifyCSS: true,
    includeComments: false,
  },

  standard: {
    inlineImages: false,
    minifyHTML: true,
    minifyCSS: true,
    includeComments: false,
    separateFiles: true, // CSS/JS in separate files
  },

  development: {
    inlineImages: false,
    minifyHTML: false,
    minifyCSS: false,
    includeComments: true,
    includeSourceMaps: true,
  },
};

export async function exportHTML(builderState, preset = "standard") {
  const options = EXPORT_PRESETS[preset];
  const exporter = new HTMLExporter(builderState, options);
  return await exporter.export();
}
```

## Testing

```javascript
// exportHTML.test.js
import { exportHTML } from "./exportHTML";

describe("HTML Export", () => {
  const mockState = {
    selectedTemplate: "test",
    sections: [
      {
        type: "Hero",
        props: { title: "Test", subtitle: "Test subtitle" },
      },
    ],
    customTheme: {
      colors: { primary: "#000" },
    },
  };

  it("generates valid HTML", async () => {
    const html = await exportHTML(mockState);
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
  });

  it("includes section content", async () => {
    const html = await exportHTML(mockState);
    expect(html).toContain("Test");
    expect(html).toContain("Test subtitle");
  });

  it("inlines CSS", async () => {
    const html = await exportHTML(mockState);
    expect(html).toContain("<style>");
    expect(html).toContain("</style>");
  });
});
```

---

**See Also**:

- [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) - Redux state management
- [../../docs/PERFORMANCE_OPTIMIZATION.md](../../docs/PERFORMANCE_OPTIMIZATION.md) - Performance tips
