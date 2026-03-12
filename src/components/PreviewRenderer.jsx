import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { EmptyState } from "../common";
import { selectElement as selectElementAction } from "../store/builderSlice";

export const PreviewRenderer = () => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);
  const selectedElement = useSelector((state) => state.builder.selectedElement);

  // Update selected element attribute in DOM
  useEffect(() => {
    document.querySelectorAll("[data-element]").forEach((el) => {
      el.removeAttribute("data-selected");
    });

    if (selectedElement) {
      const el = document.querySelector(`[data-element="${selectedElement}"]`);
      if (el) {
        el.setAttribute("data-selected", "true");
      }
    }
  }, [selectedElement]);

  if (!selectedTemplate || !currentConfig) {
    return (
      <EmptyState
        title="No template selected"
        description="Please select a template to start building"
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
        }}
      />
    );
  }

  const TemplateComponent = selectedTemplate.component;

  const handleElementClick = (e) => {
    // Find the closest element with data-element attribute
    const element = e.target.closest("[data-element]");
    if (element) {
      e.stopPropagation();
      const elementId = element.getAttribute("data-element");
      dispatch(selectElementAction(elementId));
    }
  };

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#e5e7eb",
        overflow: "auto",
        padding: "10px",
        position: "relative",
      }}
    >
      {/* Preview Frame */}
      <div
        onClick={handleElementClick}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          backgroundColor: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          minHeight: "100%",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {/* Highlight overlay for selected element */}
        <style>{`
          [data-element] {
            position: relative;
            transition: outline 0.2s ease;
          }
          [data-element]:hover {
            outline: 2px dashed #0066cc;
            outline-offset: 4px;
          }
          [data-element][data-selected="true"] {
            outline: 3px solid #0066cc;
            outline-offset: 4px;
          }
        `}</style>

        <div>
          <TemplateComponent config={currentConfig} />
        </div>
      </div>

      {/* Helper Text */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "white",
          padding: "10px 20px",
          borderRadius: "20px",
          fontSize: "0.85rem",
          pointerEvents: "none",
          zIndex: 1000,
          maxWidth: "90%",
          textAlign: "center",
        }}
      >
        💡 Click on any section to edit its properties
      </div>
    </div>
  );
};
