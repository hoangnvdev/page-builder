import "./index.scss";

import { useCallback, useEffect, useMemo, useRef } from "react";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TemplateRenderer } from "@/components";
import { useSelection } from "@/contexts/SelectionContext";
import { deepMerge } from "@helpers";
import { EmptyState } from "@page-builder/ui";

export const PreviewRenderer = () => {
  console.log("🎨 PreviewRenderer render");

  const { t } = useTranslation();
  const {
    selectedElement,
    selectedSubElement,
    selectElement,
    deselectElement,
  } = useSelection();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);

  // Ref to the frame element for CSS-based selection (no DOM queries!)
  const frameRef = useRef(null);

  // Memoize TemplateComponent to ensure stable reference for React.memo
  const TemplateComponent = useMemo(
    () => selectedTemplate?.component,
    [selectedTemplate?.component],
  );

  // Memoize tempConfig to prevent unnecessary re-renders of TemplateComponent
  // Only recreate when template or config actually changes, not on selection changes
  const tempConfig = useMemo(
    () => deepMerge(selectedTemplate?.defaultConfig || {}, currentConfig || {}),
    [selectedTemplate?.defaultConfig, currentConfig],
  );

  // Use event delegation instead of individual click handlers
  const handleElementClick = useCallback(
    (e) => {
      // Find the closest element with data-element attribute
      const target = e.target.closest("[data-element]");
      if (!target) return;

      e.stopPropagation();
      const elementId = target.getAttribute("data-element");
      selectElement(elementId);
    },
    [selectElement],
  );

  const handleBackgroundClick = useCallback(
    (e) => {
      // Only deselect if clicking directly on the preview-renderer background
      if (e.target.classList.contains("preview-renderer")) {
        deselectElement();
      }
    },
    [deselectElement],
  );

  // Update selection - minimal DOM manipulation using ref (no querySelector!)
  useEffect(() => {
    if (!frameRef.current) return;

    const frame = frameRef.current;

    // Clear all previously selected elements efficiently
    const previouslySelected = frame.querySelectorAll(
      ".selected, .selected-sub",
    );
    previouslySelected.forEach((el) => {
      el.classList.remove("selected", "selected-sub");
    });

    // Add selection to new element
    const selector = selectedSubElement || selectedElement;
    if (selector) {
      // Single query for the selected element
      const selectedEl = frame.querySelector(`[data-element="${selector}"]`);
      if (selectedEl) {
        selectedEl.classList.add("selected");
        if (selectedSubElement) {
          selectedEl.classList.add("selected-sub");
        }
      }
    }
  }, [selectedElement, selectedSubElement]);

  if (!selectedTemplate || !TemplateComponent) {
    return (
      <div className="preview-renderer">
        <EmptyState
          icon="📄"
          title={t("preview.emptyState.title")}
          description={t("preview.emptyState.description")}
        />
      </div>
    );
  }

  return (
    <div className="preview-renderer" onClick={handleBackgroundClick}>
      <div
        ref={frameRef}
        className="preview-renderer__frame"
        onClick={handleElementClick}
      >
        <TemplateRenderer
          Component={TemplateComponent}
          config={tempConfig}
          t={t}
        />
      </div>
    </div>
  );
};
