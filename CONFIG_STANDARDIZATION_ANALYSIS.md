# Config Standardization Analysis & Solution Architecture

> **⚠️ HISTORICAL DOCUMENT**
> This document contains the original analysis and planning for config standardization.
> **Note**: The FieldGroup organization approach described here has been **superseded** by a simpler UX.
> See [PROPERTY_PANEL_SIMPLIFICATION.md](PROPERTY_PANEL_SIMPLIFICATION.md) for the current implementation.

**Date**: March 19, 2026
**Status**: Analysis & Proposal (Historical Reference)
**Goal**: Chuẩn hóa config-driven template architecture để đảm bảo tính nhất quán, generic và dễ mở rộng

---

## I. PHÂN LOẠI COMPONENTS HIỆN TẠI

### 1. Container Components (Chứa children)

#### 1.1 Layout Containers

- **Section** - Top-level page sections
- **Container** - Content width container
- **Flex** - Flexbox layout
- **Grid** - CSS Grid layout
- **Card** - Card container with border/shadow

#### 1.2 Section Containers (Complex)

- **Hero** - Hero section (mixed: text + button)
- **Header** - Navigation header (mixed: logo + links)
- **Footer** - Footer section (mixed: text + links)
- **CallToAction** - CTA section (mixed: title + subtitle + button)
- **ComicPanels** - Comic-style grid (container with card children)
- **Features** - Feature grid (container with card children)
- **Projects** - Project grid (container with card children)
- **Stats** - Statistics grid (container with stat items)
- **Testimonials** - Testimonial grid (container with card children)
- **ImageGrid** - Image gallery grid (container with image children)
- **Terminal** - Terminal window (container with command list)

### 2. Data Display Components (Text content)

#### 2.1 Typography

- **Title** - Heading (H1-H6)
- **SubTitle** - Secondary heading
- **Text** - Body text/paragraph

#### 2.2 Interactive Text

- **Link** - Anchor link (text + href + navigation)
- **Button** - Button (mixed: text + container + navigation)

### 3. Special Components (Non-text content)

#### 3.1 Media

- **Image** - Image display
- **Avatar** - Small circular image/icon
- **Logo** - Logo display (text/emoji/image)

#### 3.2 Animated/Special

- **Marquee** - Scrolling text (mixed: text + container + animation)
- **Badge** - Status badge
- **Divider** - Horizontal/vertical separator

---

## II. VẤN ĐỀ HIỆN TẠI (Current Issues)

### 1. Logo Component Issues ⚠️

**Hiện tại:**

```javascript
logo: {
  type: { type: "select", options: ["text", "image"] },
  text: { ...text("logoText"), condition: {...} },
  url: { ...text("imageUrl"), condition: {...} }
}
```

**Vấn đề:**

- ❌ Không có field để upload hình từ máy
- ❌ Không có radio button group với 3 options rõ ràng
- ❌ Không có cơ chế xử lý file upload + lưu vào store/localStorage
- ❌ Text logo không có đầy đủ typography props

**Yêu cầu:**

- ✅ Radio group với 3 options: "Upload Image", "Text/Emoji", "Image URL"
- ✅ Sub-fields hiển thị conditional theo option chọn
- ✅ Upload image field với preview
- ✅ Text field với full typography props cho text/emoji
- ✅ URL field đơn giản cho image URL

### 2. Column Slider Issues ⚠️

**Hiện tại:**

```javascript
columns: slider("columns", 1, maxColumns); // maxColumns hardcoded
```

**Vấn đề:**

- ❌ Max value hardcoded (3, 4, 6), không dynamic theo số lượng items thực tế
- ❌ Không phù hợp với container chỉ có text content (không cần slider)

**Yêu cầu:**

- ✅ Container chỉ có text: KHÔNG có columns slider
- ✅ Container có array items: columns slider với max = items.length
- ✅ Mixed container: chỉ hiện slider nếu có array items

### 3. Text Edit Props Inconsistencies ⚠️

**Hiện tại:**

- Footer: chỉ có basic text props, thiếu `textDecoration`
- Link: có text props nhưng thiếu `underline`, `textDecoration`
- Button: thiếu một số typography props

**Yêu cầu:**

- ✅ Footer: thêm `textDecoration` (none, underline, overline, line-through)
- ✅ Link: thêm `textDecoration`, xử lý navigation
- ✅ Button: đầy đủ text + container props + navigation

### 4. Image Props Issues ⚠️

**Hiện tại:**

```javascript
image: imageProps(); // chỉ có url, alt, borderRadius, dropShadow
```

**Vấn đề:**

- ❌ Thiếu `objectFit` prop (cover, contain, fill, none)

**Yêu cầu:**

- ✅ Thêm `objectFit` vào imageProps()

### 5. Marquee Issues ⚠️

**Hiện tại:**

```javascript
speed: { type: "select", label: "animationDuration", options: [...] }
```

**Vấn đề:**

- ✅ Đã có speed/animationDuration trong config
- ⚠️ Cần verify component nhận prop này chưa

**Yêu cầu:**

- ✅ Marquee phải có: text props + container props + animationDuration

### 6. Mixed Type Components Issues ⚠️

**Containers vừa có text, vừa có structure:**

- CallToAction (CTA)
- Button
- Marquee

**Vấn đề:**

- ⚠️ Một số thiếu đầy đủ props cho cả text và container
- ⚠️ CTA button và Button thường thiếu navigation handling

**Yêu cầu:**

- ✅ CTA button: buttonText props + buttonContainer props + buttonUrl + navigation
- ✅ Regular button: text props + container props (không cần URL)
- ✅ Marquee: text props + container props + animationDuration

### 7. FieldGroup Organization Issues ⚠️

**Hiện tại:**

- PropertyPanel có logic để hiển thị FieldGroups
- Nhưng config không tổ chức rõ ràng các nhóm fields

**Yêu cầu:**

- ✅ Container sections phải có:
  - **Basic props** (ungrouped): backgroundColor, padding, maxWidth, align
  - **FieldGroups** cho từng content type:
    - `title` group (nếu có title)
    - `subtitle` group (nếu có subtitle)
    - `content` group (nếu có content)
    - `button` group (nếu có button)
    - `card` group (nếu có array items)
    - `image` group (nếu có images)
    - etc.

### 8. FormField Component Limitations ⚠️

**Hiện tại:**

- FormField supports: text, textarea, color, select, number, toggle, slider
- ❌ Không có field type cho: image upload, radio button group, file input

**Yêu cầu:**

- ✅ Tạo ImageUpload field component
- ✅ Tạo RadioGroup field component (riêng biệt với Radio trong Select)
- ✅ Xử lý file upload → base64 → store → localStorage

---

## III. GIẢI PHÁP CHUẨN HÓA (Standardization Solution)

### A. Chuẩn Hóa Config Schema

#### A1. Logo Field Standard

```javascript
// ==============================================
// LOGO FIELD STANDARD (For Header Components)
// ==============================================
logo: {
  type: {
    type: "radio", // NEW: Radio button group instead of select
    label: "logoType",
    options: [
      { value: "upload", label: "uploadImage" },
      { value: "text", label: "textOrEmoji" },
      { value: "url", label: "imageUrl" },
    ],
  },

  // Upload option - show when type === "upload"
  file: {
    type: "imageUpload", // NEW FIELD TYPE
    label: "uploadImage",
    acceptedFormats: ["image/png", "image/jpeg", "image/svg+xml"],
    maxSize: 2048, // KB
    condition: {
      field: "elements.header.logo.type",
      value: "upload",
      operator: "equals",
    },
  },

  // Text/Emoji option - show when type === "text"
  text: mergeSchemas(textContentSchema("text"), {
    text: text("logoText"),
    placeholder: "Enter text or paste emoji (e.g., 🚀)",
    condition: {
      field: "elements.header.logo.type",
      value: "text",
      operator: "equals",
    },
  }),

  // URL option - show when type === "url"
  url: {
    type: "text",
    label: "imageUrl",
    placeholder: "https://example.com/logo.png",
    condition: {
      field: "elements.header.logo.type",
      value: "url",
      operator: "equals",
    },
  },

  // Common properties (always visible)
  width: {
    type: "select",
    label: "width",
    options: [
      { value: "30px", label: "small" },
      { value: "40px", label: "medium" },
      { value: "50px", label: "large" },
      { value: "60px", label: "xl" },
    ],
  },
  height: {
    type: "select",
    label: "height",
    options: [
      { value: "30px", label: "small" },
      { value: "40px", label: "medium" },
      { value: "50px", label: "large" },
      { value: "60px", label: "xl" },
    ],
  },
}
```

#### A2. Container Props Standard

```javascript
// ==============================================
// CONTAINER PROPS (for all container types)
// ==============================================

/**
 * Basic Container Props (ungrouped)
 * Luôn hiển thị trực tiếp trong PropertyPanel
 */
const basicContainerProps = () => ({
  backgroundColor: color("backgroundColor"),
  padding: {
    type: "select",
    label: "padding",
    options: [...], // depends on container type
  },
  maxWidth: {
    type: "select",
    label: "maxWidth",
    options: maxWidthOptions,
  },
  align: {
    type: "select",
    label: "textAlign",
    options: alignOptions,
  },
});

/**
 * Grid Container Props (for array items)
 * CHỈ hiển thị nếu container có array children
 */
const gridContainerProps = (arrayPath) => ({
  columns: {
    type: "slider",
    label: "columns",
    // DYNAMIC: max value = actual items.length
    min: 1,
    max: { dynamic: `${arrayPath}.length` }, // NEW: dynamic max
    step: 1,
  },
  gap: {
    type: "select",
    label: "gap",
    options: gapOptions,
  },
});
```

#### A3. Text Props Standard

```javascript
// ==============================================
// TEXT PROPS (for text content)
// ==============================================

/**
 * Basic Text Props
 */
const textContentPropsBasic = () => ({
  text: textarea("content"),
  color: color("textColor"),
  size: {
    type: "select",
    label: "fontSize",
    options: textSizeOptions,
  },
  weight: {
    type: "select",
    label: "fontWeight",
    options: weightOptions,
  },
});

/**
 * Enhanced Text Props (with decoration)
 * For Footer, Link, etc.
 */
const textContentPropsEnhanced = () => ({
  ...textContentPropsBasic(),
  decoration: {
    type: "select",
    label: "textDecoration",
    options: [
      { value: "none", label: "none" },
      { value: "underline", label: "underline" },
      { value: "overline", label: "overline" },
      { value: "line-through", label: "lineThrough" },
    ],
  },
});
```

#### A4. Button Props Standard

```javascript
// ==============================================
// BUTTON PROPS (for CTA buttons with navigation)
// ==============================================

const buttonPropsWithNavigation = () => ({
  text: text("buttonText"),
  url: text("buttonUrl"), // NEW: for navigation
  color: color("buttonBackground"),
  textColor: color("buttonTextColor"),
  size: {
    type: "select",
    label: "fontSize",
    options: [
      { value: "small", label: "small" },
      { value: "medium", label: "medium" },
      { value: "large", label: "large" },
    ],
  },
  borderRadius: {
    type: "select",
    label: "borderRadius",
    options: borderRadiusOptions,
  },
});
```

#### A5. Image Props Standard

```javascript
// ==============================================
// IMAGE PROPS (for image display)
// ==============================================

const imagePropsComplete = () => ({
  url: text("imageUrl"),
  alt: text("imageAlt"),
  objectFit: {
    // NEW: Added objectFit
    type: "select",
    label: "objectFit",
    options: [
      { value: "cover", label: "cover" },
      { value: "contain", label: "contain" },
      { value: "fill", label: "fill" },
      { value: "none", label: "none" },
    ],
  },
  borderRadius: {
    type: "select",
    label: "borderRadius",
    options: borderRadiusOptions,
  },
  dropShadow: {
    type: "select",
    label: "shadowBlur",
    options: dropShadowOptions,
  },
});
```

#### A6. Marquee Props Standard

```javascript
// ==============================================
// MARQUEE PROPS (text + container + animation)
// ==============================================

const marqueePropsComplete = () => ({
  // Text content
  text: text("text"),
  textColor: color("textColor"),
  textSize: {
    type: "select",
    label: "fontSize",
    options: textSizeOptions,
  },
  textWeight: {
    type: "select",
    label: "fontWeight",
    options: weightOptions,
  },

  // Container
  backgroundColor: color("backgroundColor"),
  padding: {
    type: "select",
    label: "padding",
    options: marqueePaddingOptions,
  },

  // Animation
  animationDuration: {
    type: "select",
    label: "animationDuration",
    options: [
      { value: "10s", label: "fast" },
      { value: "20s", label: "normal" },
      { value: "30s", label: "slow" },
    ],
  },
});
```

### B. Chuẩn Hóa FieldGroup Organization

#### B1. Container Section Structure

```javascript
// ==============================================
// EXAMPLE: Hero Section (mixed content)
// ==============================================

hero: {
  // BASIC PROPS (ungrouped) - hiển thị trước
  backgroundColor: color("backgroundColor"),
  padding: { type: "select", ... },
  maxWidth: { type: "select", ... },
  align: { type: "select", ... },

  // FIELD GROUPS - hiển thị sau, mỗi group collapsible
  title: { // FieldGroup
    ...titleContentSchema(),
  },
  subtitle: { // FieldGroup
    ...textContentSchema("text", true),
  },
  button: { // FieldGroup
    ...buttonPropsWithNavigation(),
  },
}
```

#### B2. Grid Container Structure

```javascript
// ==============================================
// EXAMPLE: Features Section (grid of cards)
// ==============================================

features: {
  // BASIC PROPS (ungrouped)
  backgroundColor: color("backgroundColor"),
  padding: { type: "select", ... },
  maxWidth: { type: "select", ... },
  align: { type: "select", ... },

  // GRID LAYOUT PROPS (ungrouped)
  columns: {
    type: "slider",
    min: 1,
    max: { dynamic: "elements.features.items.length" },
  },
  gap: { type: "select", ... },

  // FIELD GROUPS
  heading: { // FieldGroup
    ...headingContentSchema(),
  },
  card: { // FieldGroup - template for array items
    ...cardSchema(),
    icon: text("icon"),
    title: titleContentSchema(),
    content: textContentSchema("text", true),
  },

  // ARRAY DATA
  items: arrayField("items"),
}
```

### C. New Field Components Required

#### C1. ImageUpload Field Component

```javascript
// packages/app/src/components/form/ImageUpload/index.jsx

export const ImageUpload = ({
  id,
  label,
  value, // base64 string or URL
  onChange,
  acceptedFormats = ["image/png", "image/jpeg", "image/svg+xml"],
  maxSize = 2048, // KB
}) => {
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file
    if (!acceptedFormats.includes(file.type)) {
      alert("Invalid file type");
      return;
    }

    if (file.size > maxSize * 1024) {
      alert(`File too large. Max size: ${maxSize}KB`);
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      onChange(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-upload">
      <label>{label}</label>
      <input
        type="file"
        accept={acceptedFormats.join(",")}
        onChange={handleFileSelect}
      />
      {value && (
        <div className="image-upload__preview">
          <img src={value} alt="Preview" />
          <button onClick={() => onChange("")}>Remove</button>
        </div>
      )}
    </div>
  );
};
```

#### C2. RadioGroup Field Component

```javascript
// packages/app/src/components/form/RadioGroup/index.jsx

export const RadioGroup = ({
  id,
  label,
  value,
  onChange,
  options,
  orientation = "vertical",
}) => {
  return (
    <div className={`radio-group radio-group--${orientation}`}>
      <label className="radio-group__label">{label}</label>
      <div className="radio-group__options">
        {options.map((option) => (
          <label key={option.value} className="radio-group__option">
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
```

### D. FormField Component Updates

```javascript
// packages/app/src/components/form/FormField/index.jsx

// Add new field types
case "imageUpload":
  return (
    <ImageUpload
      id={fieldId}
      label={translatedLabel}
      value={value}
      onChange={onChange}
      acceptedFormats={options?.acceptedFormats}
      maxSize={options?.maxSize}
    />
  );

case "radio":
  return (
    <RadioGroup
      id={fieldId}
      label={translatedLabel}
      value={value}
      onChange={onChange}
      options={getTranslatedOptions(options)}
      orientation={options?.orientation || "vertical"}
    />
  );
```

---

## IV. IMPLEMENTATION PLAN

### Phase 1: Core Infrastructure (Week 1)

#### 1.1 Create New Field Components

- [ ] `ImageUpload` component with file validation & base64 conversion
- [ ] `RadioGroup` component (distinct from Radio in Select)
- [ ] Update `FormField` to support new types
- [ ] Add SCSS styling for new components

#### 1.2 Update Schema Builders

- [ ] Add `logoFieldComplete()` to genericSchemaBuilders
- [ ] Add `textContentPropsEnhanced()` with decoration
- [ ] Add `buttonPropsWithNavigation()` with URL
- [ ] Update `imageProps()` to include objectFit
- [ ] Add `marqueePropsComplete()`

#### 1.3 Update Schema Processor

- [ ] Implement dynamic max value for slider (based on array length)
- [ ] Improve FieldGroup detection and organization
- [ ] Add support for conditional field visibility

### Phase 2: Config File Updates (Week 2)

#### 2.1 Update All Template Configs

- [ ] businessPro.config.js
- [ ] comicSplash.config.js
- [ ] futuristicTech.config.js
- [ ] refinedClassic.config.js

**For each config:**

- [ ] Migrate logo field to new standard
- [ ] Add textDecoration to footer
- [ ] Add objectFit to image fields
- [ ] Organize sections with proper FieldGroups
- [ ] Add navigation URLs to buttons
- [ ] Ensure dynamic column sliders

#### 2.2 Update Component Properties Registry

- [ ] Update `componentProperties.js` with new field standards
- [ ] Remove hardcoded column max values
- [ ] Add missing props (textDecoration, objectFit, etc.)

### Phase 3: Component Updates (Week 3)

#### 3.1 Update Section Components

- [ ] Header: Support new logo system with upload
- [ ] Footer: Support textDecoration
- [ ] CallToAction: Add navigation handling for button
- [ ] Button: Ensure all props are used
- [ ] Link: Add navigation handling
- [ ] Marquee: Ensure animationDuration is applied
- [ ] Image: Apply objectFit prop

#### 3.2 Add Navigation Handling

- [ ] Create `useNavigation` hook for internal/external links
- [ ] Update Button component with onClick navigation
- [ ] Update Link component with onClick navigation
- [ ] Test navigation with anchors and URLs

### Phase 4: Testing & Documentation (Week 4)

#### 4.1 Testing

- [ ] Test logo upload with different formats
- [ ] Test dynamic column sliders
- [ ] Test conditional field visibility
- [ ] Test navigation on buttons and links
- [ ] Test all new field types
- [ ] Test FieldGroup collapsibility

#### 4.2 Documentation

- [ ] Update CONFIG_SCHEMA_GUIDE.md
- [ ] Document logo field standard
- [ ] Document FieldGroup organization
- [ ] Create migration guide for new templates

---

## V. CÁC FILE CẦN THAY ĐỔI (Files to Modify)

### A. New Files (Create)

```
packages/app/src/components/form/
├── ImageUpload/
│   ├── index.jsx          # NEW
│   └── index.scss         # NEW
└── RadioGroup/
    ├── index.jsx          # NEW (distinct from Radio)
    └── index.scss         # NEW

packages/app/src/hooks/
└── useNavigation.js       # NEW - handle internal/external navigation

docs/
└── CONFIG_SCHEMA_GUIDE.md # NEW - comprehensive schema documentation
```

### B. Existing Files (Update)

```
packages/app/src/
├── components/form/FormField/index.jsx                    # Add new field types
├── constants/componentProperties.js                       # Update standards
└── utils/schemaProcessor.js                               # Dynamic max, better groups

packages/templates/src/
├── utils/genericSchemaBuilders.js                         # Add new builders
├── configs/businessPro.config.js                          # Migrate
├── configs/comicSplash.config.js                          # Migrate
├── configs/futuristicTech.config.js                       # Migrate
├── configs/refinedClassic.config.js                       # Migrate
└── sections/
    ├── Header/index.jsx                                   # Logo upload support
    ├── Footer/index.jsx                                   # Text decoration
    ├── CallToAction/index.jsx                             # Navigation
    ├── Button/index.jsx (if exists in ui package)         # Navigation
    ├── Link/index.jsx (if exists in ui package)           # Navigation
    ├── Marquee/index.jsx                                  # Animation duration
    └── Image/index.jsx (if exists in ui package)          # Object fit
```

---

## VI. EXPECTED OUTCOMES

### Sau khi hoàn thành, dự án sẽ có:

✅ **Config-driven hoàn toàn**

- Mọi thay đổi UI đều reference config
- Config chuẩn, generic, dễ mở rộng
- Thêm template mới chỉ cần tạo config file mới

✅ **Logo system hoàn chỉnh**

- Upload image từ máy với preview
- Text/emoji input với full typography props
- Image URL input đơn giản
- Lưu vào store/localStorage/history

✅ **Dynamic column sliders**

- Max value tự động theo số items thực tế
- Chỉ hiện khi container có array items
- Không hiện với text-only containers

✅ **Field organization rõ ràng**

- Basic props ungrouped (hiển thị trực tiếp)
- Content groups collapsible (title, subtitle, button, card, etc.)
- PropertyPanel dễ navigate

✅ **Complete edit props**

- Footer: + textDecoration
- Link: + textDecoration, navigation
- CTA Button: + URL, navigation
- Marquee: + animationDuration
- Image: + objectFit

✅ **New field components**

- ImageUpload với file validation
- RadioGroup riêng biệt
- Conditional fields work properly

✅ **Better UX**

- Upload logo trực tiếp từ editor
- Click button/link để navigate
- Adjust columns theo số items
- Collapse/expand field groups

---

## VII. RISKS & MITIGATIONS

### Risks

1. **Breaking Changes** - Configs cũ có thể không compatible
   - **Mitigation**: Tạo migration script, versioning configs

2. **Image Storage** - Base64 làm localStorage bloat
   - **Mitigation**: Compress images, có option delete, warn user về size

3. **Performance** - Dynamic max value cho slider có thể slow
   - **Mitigation**: Memoize calculations, optimize re-renders

4. **File Upload Security** - XSS via malicious images
   - **Mitigation**: Validate file types, sanitize base64, CSP headers

### Testing Strategy

- Unit tests cho new components
- Integration tests cho config processing
- E2E tests cho logo upload flow
- Manual testing cho navigation
- Performance testing cho large configs

---

## VIII. NEXT STEPS

1. **Review this document** với team
2. **Get approval** cho architecture changes
3. **Start Phase 1** - Core infrastructure
4. **Iterative implementation** theo phases
5. **Regular testing** sau mỗi phase

**Estimate**: 4 weeks full implementation
**Priority**: High - foundational architecture issue
**Complexity**: Medium-High

---

_Document prepared by AI Solution Architect_
_Ready for team review and implementation_
