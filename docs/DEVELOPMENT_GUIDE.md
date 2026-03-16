# Development Guide

**Last Updated**: March 15, 2026

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/page-builder.git
cd page-builder

# Install dependencies
pnpm install

# Start development server
pnpm start
```

The app will open at `http://localhost:3000`

### Project Setup Verification

```bash
# Check pnpm workspaces
pnpm list --depth 0

# Expected output:
# @page-builder/root
# ├── @page-builder/app
# ├── @page-builder/templates
# └── @page-builder/ui
```

## Development Workflow

### Daily Development

```bash
# Start all dev servers with watch mode
pnpm start

# This runs:
# - packages/app dev server (port 3000)
# - packages/templates watch build
# - packages/ui watch build
```

### Working on Specific Packages

```bash
# Work on UI components
cd packages/ui
pnpm dev

# Work on templates
cd packages/templates
pnpm dev

# Work on app (from root)
cd packages/app
pnpm dev
```

### Hot Module Replacement (HMR)

Vite provides instant HMR for all packages:

- **UI Changes**: Auto-rebuild → App reloads
- **Template Changes**: Auto-rebuild → App reloads
- **App Changes**: Instant HMR (no refresh)

## Package Development

### Creating a New UI Component

```bash
cd packages/ui/src

# 1. Create component folder
mkdir Alert
cd Alert

# 2. Create files
touch index.jsx index.scss
```

```jsx
// index.jsx
import "./index.scss";

export function Alert({ variant = "info", children, onClose }) {
  return (
    <div className={`alert alert--${variant}`}>
      <div className="alert__content">{children}</div>
      {onClose && (
        <button className="alert__close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
}
```

```scss
// index.scss
.alert {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  &--info {
    background: #e3f2fd;
    color: #0d47a1;
  }

  &--success {
    background: #e8f5e9;
    color: #1b5e20;
  }

  &--warning {
    background: #fff3e0;
    color: #e65100;
  }

  &--error {
    background: #ffebee;
    color: #b71c1c;
  }

  &__content {
    flex: 1;
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0 0.5rem;
  }
}
```

```javascript
// Export in packages/ui/src/index.js
export { Alert } from "./Alert";
```

### Creating a New Template Component

```bash
cd packages/templates/src/components

# 1. Create component folder
mkdir Pricing
cd Pricing
touch index.jsx index.scss
```

```jsx
// index.jsx
import { Button, Card, Grid } from "@page-builder/ui";
import "./index.scss";

export function Pricing({ plans = [], title, subtitle }) {
  return (
    <section className="pricing">
      <div className="pricing__header">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <Grid columns={plans.length} gap="lg">
        {plans.map((plan, index) => (
          <Card key={index} className="pricing__card">
            <Card.Content>
              <h3>{plan.name}</h3>
              <div className="pricing__price">
                <span className="pricing__amount">${plan.price}</span>
                <span className="pricing__period">/{plan.period}</span>
              </div>
              <ul className="pricing__features">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </Card.Content>
            <Card.Actions>
              <Button variant="primary">{plan.cta}</Button>
            </Card.Actions>
          </Card>
        ))}
      </Grid>
    </section>
  );
}
```

```javascript
// Register in packages/templates/src/core/registries/componentRegistry.js
import { Pricing } from "../../components/Pricing";
registerComponent("Pricing", Pricing);
```

### Creating a New Template

```bash
cd packages/templates/src/configs
touch startupLanding.config.js
```

```javascript
// startupLanding.config.js
export default {
  name: "Startup Landing",
  description: "Perfect for SaaS and tech startups",
  theme: {
    colors: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#ec4899",
      background: "#ffffff",
      text: "#1f2937",
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
  },
  sections: [
    {
      type: "Header",
      props: {
        logo: "Startup",
        nav: [
          { label: "Features", link: "#features" },
          { label: "Pricing", link: "#pricing" },
          { label: "Contact", link: "#contact" },
        ],
        cta: { text: "Get Started", link: "/signup" },
      },
    },
    {
      type: "Hero",
      props: {
        title: "Build Something Amazing",
        subtitle: "The modern platform for innovative teams",
        primaryCTA: { text: "Start Free Trial", link: "/trial" },
        secondaryCTA: { text: "Watch Demo", link: "/demo" },
        image: "/hero-image.svg",
      },
    },
    {
      type: "Features",
      props: {
        title: "Everything you need",
        features: [
          {
            icon: "Zap",
            title: "Lightning Fast",
            description: "Optimized for speed and performance",
          },
          // ... more features
        ],
      },
    },
    {
      type: "Pricing",
      props: {
        title: "Simple, transparent pricing",
        plans: [
          {
            name: "Starter",
            price: 19,
            period: "month",
            features: ["5 Projects", "10 Users", "10GB Storage"],
            cta: "Start Free",
          },
          // ... more plans
        ],
      },
    },
    {
      type: "Footer",
      props: {
        copyright: "© 2026 Startup Inc.",
        links: [
          { label: "Privacy", url: "/privacy" },
          { label: "Terms", url: "/terms" },
        ],
      },
    },
  ],
};
```

```javascript
// Export in packages/templates/src/configs/index.js
export { default as startupLandingConfig } from "./startupLanding.config.js";
```

## Code Standards

### File Naming

- **Components**: PascalCase (`Button.jsx`, `CardHeader.jsx`)
- **Utilities**: camelCase (`exportHTML.js`, `processConfig.js`)
- **Styles**: Same as component (`Button.scss`)
- **Tests**: `*.test.js` or `*.spec.js`
- **Configs**: camelCase with `.config.js` suffix

### Component Structure

```jsx
// Imports (external, then internal)
import { useState } from "react";
import { Button } from "@page-builder/ui";
import "./ComponentName.scss";

// PropTypes (optional but recommended)
ComponentName.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

// Default props
ComponentName.defaultProps = {
  onClick: () => {},
};

// Component
export function ComponentName({ title, onClick }) {
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Handlers
  const handleClick = () => {
    onClick();
  };

  // Render
  return (
    <div className="component-name">
      <h2>{title}</h2>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
}
```

### Style Guidelines

```scss
// BEM methodology
.component-name {
  // Block styles
  padding: 1rem;

  &__element {
    // Element styles
    margin-bottom: 0.5rem;
  }

  &--modifier {
    // Modifier styles
    background: blue;
  }

  // Nested elements
  &__element {
    color: red;

    &--active {
      font-weight: bold;
    }
  }
}
```

### Redux Toolkit Patterns

```javascript
// Create slice
const featureSlice = createSlice({
  name: "feature",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Synchronous actions
    setData(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Async actions
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Async thunk
export const fetchData = createAsyncThunk(
  "feature/fetchData",
  async (params) => {
    const response = await api.getData(params);
    return response.data;
  },
);
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests for specific package
cd packages/ui
pnpm test
```

### Writing Tests

```javascript
// Button.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies variant class", () => {
    render(<Button variant="primary">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("button--primary");
  });
});
```

## Debugging

### Browser DevTools

```javascript
// Redux DevTools
// Install extension: https://github.com/reduxjs/redux-devtools

// Enable in store.js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
```

### React DevTools

Install React DevTools extension for Chrome/Firefox to inspect component tree, props, and state.

### Vite Debug Mode

```bash
# Start with debug logging
DEBUG=vite:* pnpm start
```

### Common Issues

#### Issue: "Cannot find module '@page-builder/ui'"

**Solution**: Rebuild dependencies

```bash
pnpm install
pnpm build:ui
```

#### Issue: Changes not reflecting

**Solution**: Clear Vite cache

```bash
rm -rf node_modules/.vite
pnpm start
```

#### Issue: TypeScript errors in JS project

**Solution**: Check jsconfig.json or disable TypeScript checking

## Performance Profiling

### React Profiler

```jsx
import { Profiler } from "react";

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>;
```

### Bundle Analysis

```bash
# Analyze app bundle
cd packages/app
pnpm build -- --mode analyze

# Opens visualization of bundle composition
```

## Git Workflow

### Branch Naming

- `feature/component-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/what-changed` - Code refactoring
- `docs/what-documented` - Documentation updates

### Commit Messages

```
type(scope): subject

body

footer
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Example**:

```
feat(ui): add Alert component

- Created Alert component with 4 variants
- Added styles with SCSS modules
- Exported from ui package

Closes #123
```

### Pull Request Process

1. Create feature branch
2. Make changes and commit
3. Push to remote
4. Open pull request
5. Request review
6. Address feedback
7. Merge when approved

## Environment Variables

### Development

Create `.env.local` in package root:

```bash
# API
VITE_API_URL=http://localhost:3001

# Feature flags
VITE_ENABLE_EXPORT=true
VITE_ENABLE_ANALYTICS=false

# Debug
VITE_DEBUG=true
```

### Production

Set in Netlify dashboard or CI/CD:

```bash
VITE_API_URL=https://api.production.com
VITE_ENABLE_EXPORT=true
VITE_ENABLE_ANALYTICS=true
VITE_DEBUG=false
```

## Resources

### Internal Docs

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- [PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md)

### External Links

- [React Docs](https://react.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Vite Docs](https://vitejs.dev)
- [pnpm Docs](https://pnpm.io)

---

**Need help?** Open an issue or ask in the team channel.
