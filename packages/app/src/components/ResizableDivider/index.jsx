import "./index.scss";

import { useEffect, useRef } from "react";

import PropTypes from "prop-types";

export const ResizableDivider = ({ onResize, orientation = "horizontal" }) => {
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      if (orientation === "horizontal") {
        // Desktop: adjust panel width (RTL-aware)
        const containerWidth = window.innerWidth;
        const isRTL = document.documentElement.getAttribute("dir") === "rtl";

        // Calculate position from the correct side based on direction
        const newWidth = isRTL ? containerWidth - e.clientX : e.clientX;
        const percentage = (newWidth / containerWidth) * 100;
        const minPanelPercentage = (350 / containerWidth) * 100;
        const maxPreviewPercentage = 100 - minPanelPercentage;
        const constrainedPercentage = Math.max(
          50,
          Math.min(maxPreviewPercentage, percentage),
        );
        onResize(constrainedPercentage);
      } else {
        // Mobile: adjust preview/panel split from bottom
        // Get the editor content container
        const editorContent = document.querySelector(".editor__content");
        if (!editorContent) return;

        const rect = editorContent.getBoundingClientRect();
        const containerHeight = rect.height;
        const mouseY = e.clientY - rect.top;
        const percentage = (mouseY / containerHeight) * 100;

        // Constrain: preview 35-80%, which means panel 20-65%
        const constrainedPercentage = Math.max(35, Math.min(80, percentage));
        onResize(constrainedPercentage);
      }
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current) return;

      const touch = e.touches[0];
      if (orientation === "horizontal") {
        const containerWidth = window.innerWidth;
        const isRTL = document.documentElement.getAttribute("dir") === "rtl";

        // Calculate position from the correct side based on direction
        const newWidth = isRTL ? containerWidth - touch.clientX : touch.clientX;
        const percentage = (newWidth / containerWidth) * 100;
        const minPanelPercentage = (350 / containerWidth) * 100;
        const maxPreviewPercentage = 100 - minPanelPercentage;
        const constrainedPercentage = Math.max(
          50,
          Math.min(maxPreviewPercentage, percentage),
        );
        onResize(constrainedPercentage);
      } else {
        // Mobile: adjust preview/panel split from bottom
        const editorContent = document.querySelector(".editor__content");
        if (!editorContent) return;

        const rect = editorContent.getBoundingClientRect();
        const containerHeight = rect.height;
        const touchY = touch.clientY - rect.top;
        const percentage = (touchY / containerHeight) * 100;

        // Constrain between 35% and 80% (preview min 35%, panel max 65%)
        const constrainedPercentage = Math.max(35, Math.min(80, percentage));
        onResize(constrainedPercentage);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [onResize, orientation]);

  const handleMouseDown = () => {
    isDraggingRef.current = true;
    document.body.style.cursor =
      orientation === "horizontal" ? "ew-resize" : "ns-resize";
    document.body.style.userSelect = "none";
  };

  const handleTouchStart = () => {
    isDraggingRef.current = true;
    document.body.style.userSelect = "none";
  };

  return (
    <div
      className={`resizable-divider resizable-divider--${orientation}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="resizable-divider__handle" />
    </div>
  );
};

ResizableDivider.propTypes = {
  onResize: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};
