# Quick Start Guide

Get the Page Builder running in 3 simple steps!

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or higher).

Check by running:

```bash
node --version
```

## Installation & Setup

### 1. Navigate to the project folder

```bash
cd page-builder
```

### 2. Install dependencies

```bash
npm install
```

This will install:

- React 18
- Redux Toolkit (state management)
- React Redux (React bindings for Redux)
- Formik (forms)
- Vite (build tool)
- Lucide React (icons)

### 3. Start the development server

```bash
npm run dev
```

The app will open automatically in your browser at `http://localhost:3000`

## What You'll See

1. **Template Gallery** - Choose from 2 templates:
   - Modern Portfolio
   - Business Landing

2. **Editor View** - After selecting a template:
   - Click sections to edit
   - Adjust colors, text, and more
   - See changes in real-time

3. **Export** - Download your page as HTML

## Try It Out!

1. Select "Modern Portfolio"
2. Click on the purple hero section
3. Change the title to your name
4. Change button color
5. Click "Export HTML"
6. Open the downloaded file in your browser!

## Production Build

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` folder.

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
page-builder/
├── src/
│   ├── components/      # UI components
│   ├── templates/       # Template definitions
│   ├── store/          # State management
│   ├── utils/          # Helper functions
│   └── main.jsx        # Entry point
├── index.html          # HTML entry
└── package.json        # Dependencies
```

## Need More Info?

- **For Users**: See [USER_GUIDE.md](USER_GUIDE.md)
- **For Developers**: See [DEVELOPMENT.md](DEVELOPMENT.md)
- **General Info**: See [README.md](README.md)

## Troubleshooting

**Port already in use?**

```bash
# Vite will automatically try port 3001, 3002, etc.
# Or specify a different port:
npm run dev -- --port 3001
```

**Dependencies not installing?**

```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

**Export not working?**

- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Check browser console for errors (F12)

---

Enjoy building! 🚀
