# Page Builder

A browser-based page builder for non-technical users to create static websites.

## Features

- 🎨 **Template Gallery** - Browse and select from pre-built templates
- ✏️ **Visual Editor** - Click and customize any element
- 👁️ **Live Preview** - See changes in real-time
- 📦 **HTML Export** - Download as ready-to-use static HTML
- 🎯 **No Code Required** - Perfect for non-technical users

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## How to Use

1. **Select a Template** - Choose from available templates
2. **Customize** - Click on elements to edit colors, text, images, etc.
3. **Preview** - See your changes in real-time
4. **Export** - Download your page as static HTML

## Templates

- **Modern Portfolio** - Clean, professional portfolio layout
- **Business Landing** - Conversion-focused business page

## Project Structure

```
page-builder/
├── src/
│   ├── components/        # React components
│   ├── templates/         # Template definitions
│   ├── store/            # Zustand state management
│   ├── utils/            # Helper functions
│   └── main.jsx          # Entry point
├── index.html
└── package.json
```

## Tech Stack

- React 18
- Redux Toolkit (state management)
- Formik (forms)
- Vite (build tool)
- Lucide React (icons)

## Export Format

Exported pages are fully self-contained HTML files with inline CSS. No build tools or runtime dependencies required.
