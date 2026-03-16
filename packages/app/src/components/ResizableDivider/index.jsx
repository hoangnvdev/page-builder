import './index.scss';

import {
  useEffect,
  useRef,
} from 'react';

import PropTypes from 'prop-types';

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
        // Mobile: adjust top panel height
        const containerHeight = window.innerHeight;
        const toolbarHeight = 60; // Approximate toolbar height
        const availableHeight = containerHeight - toolbarHeight;
        const newHeight = e.clientY - toolbarHeight;
        const percentage = (newHeight / availableHeight) * 100;

        // Constrain between 30% and 70%
        const constrainedPercentage = Math.max(30, Math.min(70, percentage));
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
        const containerHeight = window.innerHeight;
        const toolbarHeight = 60;
        const availableHeight = containerHeight - toolbarHeight;
        const newHeight = touch.clientY - toolbarHeight;
        const percentage = (newHeight / availableHeight) * 100;
        const constrainedPercentage = Math.max(30, Math.min(70, percentage));
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
