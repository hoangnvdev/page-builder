## 📚 Storybook

Interactive component documentation and playground.

### Running Storybook

```bash
cd packages/ui

# Start development server
pnpm storybook

# Build static Storybook (for deployment)
pnpm build-storybook
```

Visit http://localhost:6006 to explore all components with:

- **Interactive controls** - Modify props in real-time
- **Multiple variants** - See all component states
- **Code examples** - Copy-paste ready code
- **Accessibility checks** - Built-in a11y testing
- **Responsive preview** - Test on different screen sizes

### Available Stories

- ✅ **Input** - Text, email, password, number with validation
- ✅ **Textarea** - Multi-line input with all states
- ✅ **Select** - Dropdown with options and validation
- ✅ **Radio** - Radio button groups with horizontal/vertical layouts
- ✅ **Toggle** - Switch component with sizes
- ✅ **Slider** - Range slider with labels
- ✅ **ColorPicker** - Color selection with hex input
- ✅ **Card** - Cards with images and content
- ✅ **Title** - Heading levels 1-6
- ✅ **SubTitle** - Subtitle component for page sections
  Note: Avatar, Badge, Button and other layout components are available but don't have Storybook stories yet.

### Writing Stories

See `.storybook/WRITING_STORIES.md` for a complete guide.

Example story structure:

```jsx
// ComponentName.stories.jsx
import { ComponentName } from "./index";

export default {
  title: "Components/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: "Example",
    variant: "primary",
  },
};
```

## 🤝 Contributing

### For Collaborators

Welcome! This UI library is designed to be contributor-friendly.

#### Getting Started

1. **Setup**

   ```bash
   # Clone and install
   git clone <repo>
   pnpm install
   ```

2. **Explore Components**

   ```bash
   cd packages/ui
   pnpm storybook
   ```

3. **Make Changes**
   - Browse existing components in Storybook
   - Check `.storybook/WRITING_STORIES.md` for patterns
   - Test changes in Storybook before committing

#### Adding a New Component

1. **Create component structure:**

   ```
   src/components/NewComponent/
   ├── index.jsx               # Component logic
   ├── index.scss              # Styles (BEM naming)
   └── NewComponent.stories.jsx  # Storybook stories
   ```

2. **Export from package:**

   ```js
   // src/index.js
   export { NewComponent } from "./components/NewComponent";
   ```

3. **Add translations (if needed):**

   ```json
   // src/locales/en-EN.json
   {
     "ui": {
       "newComponent": {
         "placeholder": "Enter text..."
       }
     }
   }
   ```

4. **Write stories:**

   ```jsx
   // Show component states and variants
   export const Default = { args: { ... } };
   export const WithValue = { args: { ... } };
   export const Disabled = { args: { ... } };
   ```

5. **Test in Storybook:**
   ```bash
   pnpm storybook
   ```

#### Code Style

- **Components**: PascalCase (`Button.jsx`)
- **Props**: camelCase with PropTypes validation
- **Styles**: BEM-like SCSS (`.component__element--modifier`)
- **Stories**: CSF 3.0 format with `render` functions for stateful components
- **Naming**: Descriptive and consistent with existing components

#### Checklist

Before submitting a PR:

- [ ] Component renders correctly in Storybook
- [ ] All props are documented with PropTypes
- [ ] Stories cover main use cases
- [ ] Styles follow BEM naming conventions
- [ ] Component works in all supported browsers
- [ ] Accessibility (keyboard navigation, ARIA labels)
- [ ] Responsive behavior tested
- [ ] No console errors/warnings

#### Questions?

- Check existing components for patterns
- Browse Storybook for usage examples
- See `docs/STYLING_GUIDE.md` for styling conventions
- Open an issue or discussion

### Component Principles

1. **Composable** - Components should be simple and composable
2. **Accessible** - Always consider a11y (ARIA, keyboard nav)
3. **Themeable** - Use CSS variables for colors/spacing
4. **Responsive** - Mobile-first, flexible layouts
5. **Documented** - Props, examples, and edge cases in Storybook
6. **Tested** - Visual testing via Storybook stories

## 📖 Additional Resources

- **Styling Guide** - `docs/STYLING_GUIDE.md`
- **Story Writing** - `.storybook/WRITING_STORIES.md`
- **Storybook Config** - `.storybook/README.md`
- **Main Docs** - `../../docs/` (workspace root)

---

**Questions or Ideas?** Open an issue or start a discussion. Contributions welcome! 🎉
