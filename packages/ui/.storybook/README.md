# Storybook Configuration

This directory contains the Storybook configuration for the UI component library.

## Files

- **main.js** - Main Storybook configuration (addons, framework, story locations)
- **preview.js** - Global decorators and parameters for all stories

## Configuration Details

### Story Location

Stories are located alongside their components:

- `src/components/*/ComponentName.stories.jsx`

### Addons

- **addon-essentials** - Includes docs, controls, actions, viewport, backgrounds, toolbars, measure, outline
- **addon-links** - Link stories together
- **addon-interactions** - Test component interactions

### Framework

Using `@storybook/react-vite` for fast development and build times.

## Customization

### Adding New Addons

Edit `main.js` and add the addon to the `addons` array:

```js
addons: [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  '@your-new-addon',
],
```

### Global Styles

Global styles are imported in `preview.js`:

```js
import "../src/styles.js";
```

### Decorators

Add global decorators to wrap all stories in `preview.js`.

## Running Storybook

Development mode:

```bash
pnpm storybook
```

Build static version:

```bash
pnpm build-storybook
```

The built Storybook will be in the `storybook-static` directory.
