# Week 4 - Testing & Validation Guide

**Date**: March 19, 2026
**Status**: Testing Phase
**Goal**: Validate all Week 1-3 implementations

---

## I. TESTING CHECKLIST

### ✅ Week 1 - Core Infrastructure (COMPLETED)

#### 1.1 ImageUpload Component

- [x] Component renders without errors
- [x] File type validation (PNG, JPEG, SVG, WebP)
- [x] File size validation (2MB max)
- [x] Base64 conversion working
- [x] Preview display correctly
- [x] Change/Remove actions functional
- [x] SCSS styling applied correctly
- [x] Translations working (en, vi, ja, ar)

#### 1.2 RadioGroup Component

- [x] Component renders without errors
- [x] Single selection working
- [x] Visual styling (hover, selected states)
- [x] Horizontal/vertical orientation
- [x] SCSS styling applied correctly

#### 1.3 Schema Processor Updates

- [x] resolveDynamicValue() function working
- [x] Dynamic slider max values resolved correctly
- [x] Config parameter passed through all flatten functions
- [x] No syntax errors

#### 1.4 Schema Builders

- [x] logoFieldComplete() exports correctly
- [x] imagePropsComplete() with objectFit
- [x] buttonPropsWithNavigation() (alias: buttonSchema)
- [x] linkSchema() working
- [x] textContentPropsEnhanced() with textDecoration
- [x] marqueePropsComplete() with animationDuration

### ✅ Week 2 - Config Updates (COMPLETED)

#### 2.1 businessPro.config.js

- [x] Logo field using logoFieldComplete()
- [x] Dynamic columns for features section
- [x] Dynamic columns for projects section
- [x] Footer using textContentPropsEnhanced()
- [x] No compilation errors

#### 2.2 comicSplash.config.js

- [x] Marquee using marqueePropsComplete()
- [x] Dynamic columns for 5 sections (comicPanels, features, stats, testimonials, imageGrid)
- [x] Image grid using imagePropsComplete()
- [x] Footer using textContentPropsEnhanced()
- [x] No compilation errors

#### 2.3 futuristicTech.config.js

- [x] Dynamic columns for features section
- [x] Dynamic columns for stats section
- [x] Footer using textContentPropsEnhanced()
- [x] No compilation errors

#### 2.4 refinedClassic.config.js

- [x] Dynamic columns for 4 sections (features, portfolio, stats, testimonials)
- [x] Portfolio using imagePropsComplete()
- [x] Footer using textContentPropsEnhanced()
- [x] No compilation errors

### ✅ Week 3 - Component Updates (COMPLETED)

#### 3.1 Header Component

- [x] Logo upload (base64) support
- [x] Logo text with typography props
- [x] Logo URL support
- [x] Legacy logo backward compatibility
- [x] Props mapper updated in componentRegistry

#### 3.2 Footer Component

- [x] textDecoration already supported
- [x] Works with textContentPropsEnhanced()

#### 3.3 Navigation System

- [x] Simple anchor tags for CTA buttons
- [x] Simple anchor tags for Hero buttons
- [x] External URLs open in new tab
- [x] Internal anchors work natively
- [x] Link component enhanced for smooth scrolling

#### 3.4 Image Component

- [x] objectFit already supported (cover, contain, fill, none, scale-down)
- [x] SCSS classes working correctly

#### 3.5 Marquee Component

- [x] animationDuration support added
- [x] Backward compatibility with speed prop

---

## II. MANUAL TESTING PROCEDURES

### Test 1: Logo Upload System

**Objective**: Verify logo upload accepts images, converts to base64, and displays correctly

**Steps**:

1. Start dev server: `pnpm start`
2. Select businessPro template
3. Click on Header section
4. Navigate to logo field
5. Select "Upload Image" radio option
6. Upload a PNG file (< 2MB)
7. Verify preview appears
8. Check exported HTML contains base64 data URL
9. Try uploading JPEG, SVG, WebP
10. Try uploading file > 2MB (should show error)
11. Try text/emoji option
12. Try URL option

**Expected Results**:

- ✅ All supported formats upload successfully
- ✅ Files > 2MB rejected with error message
- ✅ Preview shows uploaded image
- ✅ Exported HTML contains `data:image/...;base64,...`
- ✅ Text option shows text input with typography controls
- ✅ URL option accepts image URLs

### Test 2: Dynamic Column Sliders

**Objective**: Verify column sliders max value adjusts based on array length

**Steps**:

1. Select businessPro template
2. Navigate to Features section
3. Observe columns slider (should show max = number of items)
4. Add new feature item
5. Slider max should increase
6. Remove an item
7. Slider max should decrease
8. Set columns to max
9. Remove items until columns > items (should auto-adjust)

**Expected Results**:

- ✅ Slider max = items.length
- ✅ Adding items increases max
- ✅ Removing items decreases max
- ✅ Columns never exceed items available

### Test 3: Button Navigation

**Objective**: Verify buttons navigate correctly for all URL types

**Steps**:

1. Select any template with CTA or Hero section
2. Set button URL to `#about` (internal anchor)
3. Click button → should scroll smoothly to #about
4. Set button URL to `https://google.com` (external)
5. Click button → should open in new tab
6. Set button URL to `/page` (relative)
7. Click button → should navigate same tab
8. Export to HTML
9. Verify all link types work in exported HTML without JavaScript

**Expected Results**:

- ✅ Internal anchors scroll smoothly in editor
- ✅ External URLs open new tab with noopener noreferrer
- ✅ Relative URLs navigate same tab
- ✅ Exported HTML works without JavaScript

### Test 4: Text Decoration

**Objective**: Verify footer text decoration renders correctly

**Steps**:

1. Select any template
2. Navigate to Footer section
3. Set textDecoration to "underline"
4. Verify text is underlined
5. Try "overline", "line-through"
6. Export to HTML
7. Verify decoration appears in static HTML

**Expected Results**:

- ✅ Underline shows line below text
- ✅ Overline shows line above text
- ✅ Line-through shows strikethrough
- ✅ Decoration persists in exported HTML

### Test 5: Image Object Fit

**Objective**: Verify image objectFit property works correctly

**Steps**:

1. Select refinedClassic template
2. Navigate to Portfolio section (uses imagePropsComplete)
3. Add/select an image item
4. Change objectFit to "contain"
5. Image should show fully without cropping
6. Change to "cover"
7. Image should fill space (may crop)
8. Try "fill" (stretches)
9. Export and verify in HTML

**Expected Results**:

- ✅ Contain: image fully visible, may have empty space
- ✅ Cover: image fills space, maintains aspect ratio
- ✅ Fill: image stretches to fill space
- ✅ All modes work in exported HTML

### Test 6: Marquee Animation Duration

**Objective**: Verify marquee animation speed is configurable

**Steps**:

1. Select comicSplash template
2. Navigate to Marquee section
3. Set animationDuration to "fast" (10s)
4. Observe fast scrolling
5. Change to "slow" (30s)
6. Observe slow scrolling
7. Export and verify animation works

**Expected Results**:

- ✅ Fast setting scrolls quickly (10s)
- ✅ Slow setting scrolls slowly (30s)
- ✅ Animation persists in exported HTML
- ✅ CSS animation-duration applied correctly

---

## III. AUTOMATED TESTING

### Unit Tests (To Be Implemented)

```javascript
// packages/app/src/components/form/ImageUpload/ImageUpload.test.jsx
describe("ImageUpload", () => {
  test("accepts valid image formats", () => {
    /* ... */
  });
  test("rejects files over 2MB", () => {
    /* ... */
  });
  test("converts to base64", () => {
    /* ... */
  });
  test("shows preview", () => {
    /* ... */
  });
});

// packages/app/src/utils/schemaProcessor.test.js
describe("resolveDynamicValue", () => {
  test("resolves array length", () => {
    /* ... */
  });
  test("handles static values", () => {
    /* ... */
  });
});
```

### Integration Tests

```javascript
// Test config → component rendering
describe("Template Rendering", () => {
  test("businessPro renders with logo upload", () => {
    /* ... */
  });
  test("dynamic columns adjust to items", () => {
    /* ... */
  });
});
```

---

## IV. BROWSER COMPATIBILITY

### Desktop Browsers

- [ ] Chrome 120+ (latest)
- [ ] Firefox 121+ (latest)
- [ ] Safari 17+ (latest)
- [ ] Edge 120+ (latest)

### Mobile Browsers

- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet

### Features to Test

- Image upload (File API)
- Smooth scrolling (scroll-behavior: smooth)
- CSS object-fit
- CSS text-decoration
- CSS animations (marquee)

---

## V. PERFORMANCE TESTING

### Metrics to Measure

- [ ] Initial page load time
- [ ] Time to interactive
- [ ] Logo upload processing time (< 500ms for 2MB)
- [ ] Smooth scrolling performance (60fps)
- [ ] Export HTML generation time

### Tools

- Lighthouse (Performance score > 90)
- Chrome DevTools (Performance tab)
- React DevTools (Component render times)

---

## VI. ACCESSIBILITY TESTING

### WCAG 2.1 AA Compliance

- [ ] All images have alt text
- [ ] Buttons have accessible labels
- [ ] Form fields have labels
- [ ] Color contrast ratio > 4.5:1
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

### Tools

- axe DevTools
- WAVE browser extension
- Chrome Lighthouse Accessibility audit

---

## VII. REGRESSION TESTING

### Verify No Breaking Changes

- [ ] Existing templates still load
- [ ] Old configs still work (backward compatibility)
- [ ] Export functionality unchanged
- [ ] Editor UI stable
- [ ] localStorage persistence works
- [ ] History/undo-redo functional

---

## VIII. BUG TRACKING

### Known Issues

_To be filled during testing_

### Fixed Issues

- ✅ SCSS variable imports (Week 1)
- ✅ Parse errors in schemaProcessor.js (Week 1)
- ✅ buttonSchema export alias (Week 2)
- ✅ useNavigation overcomplicated - simplified to anchor tags (Week 3)

---

## IX. SIGN-OFF CRITERIA

**Week 4 Complete When**:

- [ ] All manual tests pass
- [ ] No critical bugs
- [ ] Documentation updated
- [ ] Migration guide created
- [ ] Performance acceptable (Lighthouse > 90)
- [ ] Accessibility audit passes (no critical issues)
- [ ] Cross-browser testing complete

---

## X. NEXT STEPS

After Week 4 completion:

1. Deploy to staging environment
2. User acceptance testing
3. Final documentation review
4. Production deployment planning
