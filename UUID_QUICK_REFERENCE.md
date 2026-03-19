# UUID Quick Reference Guide

## 📚 Import

```javascript
import {
  generateId,
  generateModalId,
  generateHistoryId,
  isValidUUID,
  // ... more utilities
} from "@/utils";
```

## 🎯 Common Use Cases

### 1. Generate a Unique ID

```javascript
const id = generateId();
// => "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

### 2. Open a Modal (Auto ID)

```javascript
const { openModal } = useModal();

// Auto-generated ID
const modalId = openModal(<MyModalContent />);

// Later, close it
closeModal(modalId);
```

### 3. Open a Modal (Custom ID)

```javascript
const modalId = openModal(<MyModalContent />, {
  id: "my-custom-modal", // Custom ID
  closable: true,
});
```

### 4. React List Keys

```javascript
// ❌ DON'T use index
items.map((item, index) => <div key={index}>...</div>);

// ✅ DO use UUID if no stable ID
items.map((item) => <div key={item.id || generateId()}>...</div>);
```

### 5. Access History Entries

```javascript
const { history } = useEditor();

// Supports both old and new format
history.past.forEach((entry) => {
  // Extract config
  const config = entry.config || entry;

  // Access metadata (if available)
  if (entry.id) {
    console.log("ID:", entry.id);
    console.log("Label:", entry.label);
    console.log("Time:", new Date(entry.timestamp));
  }
});
```

### 6. Validate UUID

```javascript
if (isValidUUID(someId)) {
  console.log("Valid UUID v4");
} else {
  console.log("Invalid UUID");
}
```

### 7. Generate Prefixed IDs

```javascript
const modalId = generateModalId(); // "modal-{uuid}"
const sessionId = generateSessionId(); // "session-{uuid}"
const exportId = generateExportId(); // "export-{uuid}"

// Custom prefix
const customId = generatePrefixedId("custom"); // "custom-{uuid}"
```

### 8. Extract Parts from Prefixed ID

```javascript
const modalId = "modal-f47ac10b-58cc-4372-a567-0e02b2c3d479";

extractPrefix(modalId); // => "modal"
extractUUID(modalId); // => "f47ac10b-58cc-4372-a567-0e02b2c3d479"
hasPrefix(modalId, "modal"); // => true
```

## 🔍 Available Functions

| Function                     | Returns      | Description                   |
| ---------------------------- | ------------ | ----------------------------- |
| `generateId()`               | string       | Full UUID v4                  |
| `generateShortId()`          | string       | First 8 chars of UUID         |
| `isValidUUID(id)`            | boolean      | Validate UUID v4 format       |
| `generatePrefixedId(prefix)` | string       | `{prefix}-{uuid}`             |
| `generateModalId()`          | string       | `modal-{uuid}`                |
| `generateHistoryId()`        | string       | `history-{uuid}`              |
| `generateSessionId()`        | string       | `session-{uuid}`              |
| `generateExportId()`         | string       | `export-{uuid}`               |
| `generateEventId()`          | string       | `event-{uuid}`                |
| `extractUUID(prefixedId)`    | string\|null | Extract UUID from prefixed ID |
| `extractPrefix(prefixedId)`  | string\|null | Extract prefix from ID        |
| `hasPrefix(id, prefix)`      | boolean      | Check if ID has prefix        |

## 📖 When to Use UUID

### ✅ Use UUID When:

- Opening modals dynamically
- Adding history entries
- Creating React list keys without stable IDs
- Generating session/export/event IDs
- Tracking user actions
- Need guaranteed unique identifiers

### ❌ Don't Use UUID When:

- IDs come from backend/API (use their IDs)
- IDs are human-readable slugs (e.g., "business-pro")
- Template/component IDs (use descriptive strings)
- Route paths
- CSS class names

## 🎓 Examples

### Example 1: Dynamic Component List

```javascript
const [components, setComponents] = useState([]);

const addComponent = (type) => {
  setComponents([
    ...components,
    {
      id: generateId(), // Unique ID
      type,
      config: getDefaultConfig(type),
    },
  ]);
};

return (
  <>
    {components.map((comp) => (
      <Component
        key={comp.id} // ✅ Stable UUID key
        {...comp}
      />
    ))}
  </>
);
```

### Example 2: Track User Session

```javascript
// On app start
const sessionId = generateSessionId();
localStorage.setItem("sessionId", sessionId);

// Track events
const trackEvent = (eventName, data) => {
  const eventId = generateEventId();

  analytics.track({
    id: eventId,
    sessionId,
    event: eventName,
    timestamp: Date.now(),
    ...data,
  });
};

// Usage
trackEvent("template_selected", { templateId: "business-pro" });
```

### Example 3: Export with Tracking

```javascript
const handleExport = async () => {
  const exportId = generateExportId();
  const sessionId = getSessionId();

  const htmlContent = exportToHTML(
    selectedTemplate.component,
    currentConfig,
    selectedTemplate.name,
  );

  // Track export
  trackExport({
    id: exportId,
    sessionId,
    templateId: selectedTemplate.id,
    timestamp: Date.now(),
  });

  downloadHTML(htmlContent, `${selectedTemplate.id}-${generateShortId()}.html`);
};
```

## 🚨 Common Mistakes

### ❌ Mistake 1: Using Index as Key

```javascript
// Bad - causes React reconciliation issues
items.map((item, index) => <div key={index}>...</div>);

// Good
items.map((item) => <div key={item.id}>...</div>);
```

### ❌ Mistake 2: Regenerating ID on Render

```javascript
// Bad - generates new ID every render!
const MyComponent = () => {
  const id = generateId(); // ❌ New ID every render
  return <div id={id}>...</div>;
};

// Good - generate once with useState/useMemo
const MyComponent = () => {
  const [id] = useState(generateId); // ✅ Generated once
  return <div id={id}>...</div>;
};
```

### ❌ Mistake 3: Manual ID Management

```javascript
// Bad - manual ID management
const [modalId, setModalId] = useState("modal-1");
openModal(modalId, <Content />);

// Good - auto-generated
const modalId = openModal(<Content />); // ✅ Auto ID
```

## 📊 Performance

- **UUID Generation:** ~0.01ms
- **Validation:** ~0.001ms
- **Bundle Size:** ~6KB (already installed)
- **Impact:** Negligible for < 1000 IDs/second

## 🔗 Related Documentation

- [UUID_USAGE_ANALYSIS.md](../UUID_USAGE_ANALYSIS.md) - Detailed analysis
- [UUID_IMPLEMENTATION_SUMMARY.md](../UUID_IMPLEMENTATION_SUMMARY.md) - Implementation details
- [utils/id.js](../packages/app/src/utils/id.js) - Source code with full JSDoc

---

**Quick Tip:** When in doubt, use `generateId()` for any dynamic identifier that needs to be unique!
