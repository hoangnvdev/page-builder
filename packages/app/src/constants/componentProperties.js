/**
 * Component Property Registry
 *
 * Defines standard editable properties for each primitive UI component.
 * This makes the editor generic and consistent across all templates.
 */

export const COMPONENT_PROPERTIES = {
  // ===== SECTION-LEVEL COMPONENTS =====
  hero: {
    type: "hero",
    label: "Hero Section",
    fields: [
      { id: "title", label: "Title", type: "text" },
      { id: "subtitle", label: "Subtitle", type: "textarea" },
      { id: "buttonText", label: "Button Text", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "titleColor", label: "Title Color", type: "color" },
      { id: "subtitleColor", label: "Subtitle Color", type: "color" },
      { id: "buttonColor", label: "Button Color", type: "color" },
      { id: "buttonTextColor", label: "Button Text Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      { id: "maxWidth", label: "Max Width", type: "text" },
      {
        id: "align",
        label: "Alignment",
        type: "select",
        options: [
          { value: "flex-start", label: "Left" },
          { value: "center", label: "Center" },
          { value: "flex-end", label: "Right" },
        ],
      },
    ],
  },

  header: {
    type: "header",
    label: "Header",
    fields: [
      { id: "companyName", label: "Company Name", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "logoColor", label: "Logo Color", type: "color" },
      { id: "linkColor", label: "Link Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      { id: "maxWidth", label: "Max Width", type: "text" },
    ],
  },

  footer: {
    type: "footer",
    label: "Footer",
    fields: [
      { id: "text", label: "Footer Text", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "textColor", label: "Text Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      {
        id: "align",
        label: "Alignment",
        type: "select",
        options: [
          { value: "flex-start", label: "Left" },
          { value: "center", label: "Center" },
          { value: "flex-end", label: "Right" },
        ],
      },
    ],
  },

  marquee: {
    type: "marquee",
    label: "Marquee",
    fields: [
      { id: "text", label: "Marquee Text", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "textColor", label: "Text Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
    ],
  },

  cta: {
    type: "cta",
    label: "Call to Action",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "subheading", label: "Subheading", type: "text" },
      { id: "buttonText", label: "Button Text", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "textColor", label: "Text Color", type: "color" },
      { id: "buttonColor", label: "Button Color", type: "color" },
      { id: "buttonTextColor", label: "Button Text Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      { id: "maxWidth", label: "Max Width", type: "text" },
    ],
  },

  features: {
    type: "features",
    label: "Features Section",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "headingColor", label: "Heading Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "slider",
        options: { min: 1, max: 4, step: 1 },
      },
    ],
  },

  about: {
    type: "about",
    label: "About Section",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "content", label: "Content", type: "textarea" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "headingColor", label: "Heading Color", type: "color" },
      { id: "textColor", label: "Text Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      { id: "maxWidth", label: "Max Width", type: "text" },
    ],
  },

  projects: {
    type: "projects",
    label: "Projects Section",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "headingColor", label: "Heading Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "slider",
        options: { min: 1, max: 4, step: 1 },
      },
    ],
  },

  comicPanels: {
    type: "comicPanels",
    label: "Comic Panels",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "headingColor", label: "Heading Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "slider",
        options: { min: 1, max: 4, step: 1 },
      },
    ],
  },

  stats: {
    type: "stats",
    label: "Stats Section",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "headingColor", label: "Heading Color", type: "color" },
      { id: "numberColor", label: "Number Color", type: "color" },
      { id: "labelColor", label: "Label Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "slider",
        options: { min: 2, max: 5, step: 1 },
      },
    ],
  },

  testimonials: {
    type: "testimonials",
    label: "Testimonials",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "headingColor", label: "Heading Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "slider",
        options: { min: 1, max: 4, step: 1 },
      },
    ],
  },

  imageGrid: {
    type: "imageGrid",
    label: "Image Grid",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "headingColor", label: "Heading Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "slider",
        options: { min: 2, max: 4, step: 1 },
      },
    ],
  },

  terminal: {
    type: "terminal",
    label: "Terminal",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "promptColor", label: "Prompt Color", type: "color" },
      { id: "responseColor", label: "Response Color", type: "color" },
      { id: "windowBgColor", label: "Window Background", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
    ],
  },

  dataStream: {
    type: "dataStream",
    label: "Data Stream",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "textColor", label: "Text Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
    ],
  },

  splitScreen: {
    type: "splitScreen",
    label: "Split Screen",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "content", label: "Content", type: "textarea" },
      { id: "imageSrc", label: "Image URL", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "headingColor", label: "Heading Color", type: "color" },
      { id: "textColor", label: "Text Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
    ],
  },

  quoteBlock: {
    type: "quoteBlock",
    label: "Quote Block",
    fields: [
      { id: "quote", label: "Quote", type: "textarea" },
      { id: "author", label: "Author", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "quoteColor", label: "Quote Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
    ],
  },

  timeline: {
    type: "timeline",
    label: "Timeline",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "lineColor", label: "Line Color", type: "color" },
      { id: "dotColor", label: "Dot Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
    ],
  },

  gallery: {
    type: "gallery",
    label: "Gallery",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "headingColor", label: "Heading Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "slider",
        options: { min: 2, max: 4, step: 1 },
      },
    ],
  },

  roadmap: {
    type: "roadmap",
    label: "Roadmap",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "lineColor", label: "Line Color", type: "color" },
      { id: "dotColor", label: "Dot Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
    ],
  },

  metrics: {
    type: "metrics",
    label: "Metrics",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "slider",
        options: { min: 2, max: 5, step: 1 },
      },
    ],
  },

  techSpecs: {
    type: "techSpecs",
    label: "Tech Specs",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
    ],
  },

  // ===== LAYOUT COMPONENTS (GENERIC) =====
  section: {
    type: "section",
    label: "Section",
    fields: [
      { id: "backgroundColor", label: "Background Color", type: "color" },
      {
        id: "padding",
        label: "Padding",
        type: "text",
        placeholder: "80px 20px",
      },
      {
        id: "maxWidth",
        label: "Max Width",
        type: "select",
        options: [
          { value: "800px", label: "800px (Narrow)" },
          { value: "1000px", label: "1000px (Medium)" },
          { value: "1200px", label: "1200px (Wide)" },
          { value: "100%", label: "Full Width" },
        ],
      },
    ],
  },

  container: {
    type: "container",
    label: "Container",
    fields: [
      {
        id: "maxWidth",
        label: "Max Width",
        type: "select",
        options: [
          { value: "800px", label: "800px" },
          { value: "1000px", label: "1000px" },
          { value: "1200px", label: "1200px" },
          { value: "1400px", label: "1400px" },
          { value: "100%", label: "Full Width" },
        ],
      },
      { id: "padding", label: "Padding", type: "text" },
    ],
  },

  flex: {
    type: "flex",
    label: "Flex Container",
    fields: [
      {
        id: "direction",
        label: "Direction",
        type: "select",
        options: [
          { value: "row", label: "Row" },
          { value: "column", label: "Column" },
        ],
      },
      {
        id: "gap",
        label: "Gap",
        type: "number",
        options: { min: 0, max: 100, step: 4 },
      },
      {
        id: "align",
        label: "Align Items",
        type: "select",
        options: [
          { value: "flex-start", label: "Start" },
          { value: "center", label: "Center" },
          { value: "flex-end", label: "End" },
        ],
      },
      {
        id: "justify",
        label: "Justify Content",
        type: "select",
        options: [
          { value: "flex-start", label: "Start" },
          { value: "center", label: "Center" },
          { value: "flex-end", label: "End" },
          { value: "space-between", label: "Space Between" },
        ],
      },
    ],
  },

  grid: {
    type: "grid",
    label: "Grid Container",
    fields: [
      {
        id: "columns",
        label: "Columns",
        type: "number",
        options: { min: 1, max: 6, step: 1 },
      },
      {
        id: "gap",
        label: "Gap",
        type: "number",
        options: { min: 0, max: 100, step: 4 },
      },
    ],
  },

  // ===== TEXT COMPONENTS =====
  title: {
    type: "title",
    label: "Title",
    fields: [
      { id: "text", label: "Text", type: "textarea" },
      {
        id: "level",
        label: "Heading Level",
        type: "select",
        options: [
          { value: "1", label: "H1 (Largest)" },
          { value: "2", label: "H2" },
          { value: "3", label: "H3" },
          { value: "4", label: "H4" },
          { value: "5", label: "H5" },
          { value: "6", label: "H6 (Smallest)" },
        ],
      },
      { id: "color", label: "Color", type: "color" },
    ],
  },

  subtitle: {
    type: "subtitle",
    label: "Subtitle",
    fields: [
      { id: "text", label: "Text", type: "textarea" },
      { id: "color", label: "Color", type: "color" },
    ],
  },

  text: {
    type: "text",
    label: "Text",
    fields: [
      { id: "text", label: "Text", type: "textarea" },
      {
        id: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "small", label: "Small" },
          { value: "medium", label: "Medium" },
          { value: "large", label: "Large" },
        ],
      },
      {
        id: "weight",
        label: "Weight",
        type: "select",
        options: [
          { value: "normal", label: "Normal" },
          { value: "medium", label: "Medium" },
          { value: "bold", label: "Bold" },
        ],
      },
      { id: "color", label: "Color", type: "color" },
    ],
  },

  // ===== INTERACTIVE COMPONENTS =====
  button: {
    type: "button",
    label: "Button",
    fields: [
      { id: "text", label: "Button Text", type: "text" },
      {
        id: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "primary", label: "Primary" },
          { value: "secondary", label: "Secondary" },
          { value: "ghost", label: "Ghost" },
          { value: "danger", label: "Danger" },
        ],
      },
      {
        id: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "small", label: "Small" },
          { value: "medium", label: "Medium" },
          { value: "large", label: "Large" },
        ],
      },
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "color", label: "Text Color", type: "color" },
    ],
  },

  link: {
    type: "link",
    label: "Link",
    fields: [
      { id: "text", label: "Link Text", type: "text" },
      { id: "href", label: "URL", type: "text" },
      { id: "color", label: "Color", type: "color" },
      { id: "underline", label: "Underline", type: "toggle" },
    ],
  },

  // ===== MEDIA COMPONENTS =====
  image: {
    type: "image",
    label: "Image",
    fields: [
      { id: "src", label: "Image URL", type: "text" },
      { id: "alt", label: "Alt Text", type: "text" },
      {
        id: "width",
        label: "Width",
        type: "text",
        placeholder: "e.g., 100%, 500px",
      },
      {
        id: "height",
        label: "Height",
        type: "text",
        placeholder: "e.g., 300px, auto",
      },
      {
        id: "fit",
        label: "Object Fit",
        type: "select",
        options: [
          { value: "cover", label: "Cover" },
          { value: "contain", label: "Contain" },
          { value: "fill", label: "Fill" },
          { value: "none", label: "None" },
        ],
      },
    ],
  },

  // ===== CONTAINER COMPONENTS =====
  card: {
    type: "card",
    label: "Card",
    fields: [
      { id: "backgroundColor", label: "Background Color", type: "color" },
      { id: "padding", label: "Padding", type: "text" },
      { id: "hoverable", label: "Hoverable Effect", type: "toggle" },
    ],
  },

  badge: {
    type: "badge",
    label: "Badge",
    fields: [
      { id: "text", label: "Text", type: "text" },
      {
        id: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "primary", label: "Primary" },
          { value: "secondary", label: "Secondary" },
          { value: "success", label: "Success" },
          { value: "danger", label: "Danger" },
        ],
      },
    ],
  },

  // ===== COLLECTION COMPONENTS =====
  itemgrid: {
    type: "itemgrid",
    label: "Item Grid",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "number",
        options: { min: 1, max: 6, step: 1 },
      },
      {
        id: "gap",
        label: "Gap",
        type: "number",
        options: { min: 0, max: 100, step: 4 },
      },
      { id: "backgroundColor", label: "Background Color", type: "color" },
    ],
  },

  testimonialcards: {
    type: "testimonialcards",
    label: "Testimonial Cards",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      {
        id: "columns",
        label: "Columns",
        type: "number",
        options: { min: 1, max: 4, step: 1 },
      },
      {
        id: "gap",
        label: "Gap",
        type: "number",
        options: { min: 0, max: 100, step: 4 },
      },
      { id: "backgroundColor", label: "Background Color", type: "color" },
    ],
  },

  timeline: {
    type: "timeline",
    label: "Timeline",
    fields: [
      { id: "heading", label: "Heading", type: "text" },
      { id: "lineColor", label: "Line Color", type: "color" },
      { id: "dotColor", label: "Dot Color", type: "color" },
      {
        id: "itemGap",
        label: "Item Gap",
        type: "number",
        options: { min: 20, max: 100, step: 10 },
      },
    ],
  },
};
