import "./index.scss";

import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { ErrorBoundary } from "@/components";
import { deselectElement, selectElement } from "@/store/builderSlice";
import { deepMerge } from "@helpers";
import { EmptyState } from "@page-builder/ui";

export const PreviewRenderer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);
  const selectedElement = useSelector((state) => state.builder.selectedElement);
  const selectedSubElement = useSelector(
    (state) => state.builder.selectedSubElement,
  );
  const [hasClicked, setHasClicked] = useState(false);
  const [showHelperText, setShowHelperText] = useState(false);
  const [isHelperDismissed, setIsHelperDismissed] = useState(false);

  const TemplateComponent = selectedTemplate?.component;
  const tempConfig = deepMerge(
    selectedTemplate?.defaultConfig || {},
    currentConfig || {},
  );

  // Use event delegation instead of individual click handlers
  const handleElementClick = (e) => {
    // Find the closest element with data-element attribute
    const target = e.target.closest("[data-element]");
    if (!target) return;

    e.stopPropagation();
    const elementId = target.getAttribute("data-element");
    dispatch(selectElement(elementId));

    // Show helper text on first click in this session
    if (!hasClicked && !isHelperDismissed) {
      setHasClicked(true);
      setShowHelperText(true);
    }
  };

  const handleDismissHelper = () => {
    setShowHelperText(false);
    setIsHelperDismissed(true);
  };

  // Update selected class when selectedElement or selectedSubElement changes
  useEffect(() => {
    const elements = document.querySelectorAll("[data-element]");
    elements.forEach((el) => {
      const elementId = el.getAttribute("data-element");

      // Check if this element is selected
      // For sub-elements, only highlight the specific sub-element
      // For sections, highlight if it matches the selected element and no sub-element is selected
      if (selectedSubElement) {
        // Nested element selection - only highlight exact match
        if (elementId === selectedSubElement) {
          el.classList.add("selected");
          el.classList.add("selected-sub");
        } else {
          el.classList.remove("selected");
          el.classList.remove("selected-sub");
        }
      } else if (elementId === selectedElement) {
        // Section-level selection
        el.classList.add("selected");
        el.classList.remove("selected-sub");
      } else {
        el.classList.remove("selected");
        el.classList.remove("selected-sub");
      }
    });
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

  const handleBackgroundClick = (e) => {
    // Only deselect if clicking directly on the preview-renderer background
    if (e.target.classList.contains("preview-renderer")) {
      dispatch(deselectElement());
    }
  };

  return (
    <>
      <div className="preview-renderer" onClick={handleBackgroundClick}>
        <div className="preview-renderer__frame" onClick={handleElementClick}>
          <ErrorBoundary>
            <TemplateComponent config={tempConfig} />
          </ErrorBoundary>
        </div>
      </div>

      {showHelperText && (
        <div className="preview-renderer__helper-text">
          <span className="preview-renderer__helper-text-content">
            {t("preview.helperTip.message")}
          </span>
          <button
            className="preview-renderer__helper-text-close"
            onClick={handleDismissHelper}
            aria-label={t("preview.accessibility.closeTip")}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};
