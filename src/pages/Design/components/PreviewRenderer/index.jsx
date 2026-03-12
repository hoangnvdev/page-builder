import "./index.scss";

import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { EmptyState } from "@/common/EmptyState";
import { deselectElement, selectElement } from "@/store/builderSlice";

// Deep merge helper
const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

export const PreviewRenderer = () => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);
  const selectedElement = useSelector((state) => state.builder.selectedElement);
  const [showHelperText, setShowHelperText] = useState(false);
  const helperTimerRef = useRef(null);

  const TemplateComponent = selectedTemplate?.component;
  const tempConfig = deepMerge(
    selectedTemplate?.defaultConfig || {},
    currentConfig || {},
  );

  useEffect(() => {
    const elements = document.querySelectorAll("[data-element]");

    const handleClick = (e) => {
      e.stopPropagation();
      const elementId = e.currentTarget.getAttribute("data-element");
      dispatch(selectElement(elementId));

      // Show helper text on first click
      if (!showHelperText) {
        setShowHelperText(true);
        if (helperTimerRef.current) {
          clearTimeout(helperTimerRef.current);
        }
        helperTimerRef.current = setTimeout(() => {
          setShowHelperText(false);
        }, 5000);
      }
    };

    elements.forEach((el) => {
      el.addEventListener("click", handleClick);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("click", handleClick);
      });
      if (helperTimerRef.current) {
        clearTimeout(helperTimerRef.current);
      }
    };
  }, [dispatch, showHelperText]);

  // Update selected class when selectedElement changes
  useEffect(() => {
    const elements = document.querySelectorAll("[data-element]");
    elements.forEach((el) => {
      const elementId = el.getAttribute("data-element");
      if (elementId === selectedElement) {
        el.classList.add("selected");
      } else {
        el.classList.remove("selected");
      }
    });
  }, [selectedElement]);

  if (!selectedTemplate) {
    return (
      <div className="preview-renderer">
        <EmptyState
          icon="📄"
          title="No Template Selected"
          description="Choose a template from the gallery to start editing"
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
        <div className="preview-renderer__frame">
          <TemplateComponent config={tempConfig} />
        </div>
      </div>

      {showHelperText && (
        <div className="preview-renderer__helper-text">
          💡 Tip: Click on any section to edit it. Click outside to view page
          settings.
        </div>
      )}
    </>
  );
};
