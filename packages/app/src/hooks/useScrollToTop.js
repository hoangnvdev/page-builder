import { useEffect } from "react";

/**
 * Hook to smoothly scroll to top of a container or window
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether scrolling is enabled (default: true)
 * @param {string} options.selector - CSS selector for container (default: window)
 * @param {string} options.behavior - Scroll behavior: 'smooth' or 'auto' (default: 'smooth')
 * @param {Array} options.dependencies - Dependencies to trigger scroll (default: [])
 */
export const useScrollToTop = ({
  enabled = true,
  selector = null,
  behavior = "smooth",
  dependencies = [],
} = {}) => {
  useEffect(() => {
    if (!enabled) return;

    // Scroll to top
    const scrollToTop = () => {
      if (selector) {
        // Scroll specific container
        const container = document.querySelector(selector);
        if (container) {
          container.scrollTo({
            top: 0,
            behavior,
          });
        }
      } else {
        // Scroll window
        window.scrollTo({
          top: 0,
          behavior,
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(scrollToTop, 0);

    return () => clearTimeout(timeoutId);
  }, [...dependencies, enabled, selector, behavior]);
};

/**
 * Hook to scroll to top on route changes
 * Use this in your router component or layout
 * @param {string} pathname - Current pathname from useLocation()
 * @param {Object} options - Same options as useScrollToTop
 */
export const useScrollToTopOnRouteChange = (pathname, options = {}) => {
  useScrollToTop({
    ...options,
    dependencies: [pathname],
  });
};

/**
 * Hook to scroll PropertyPanel to top when selection changes
 * @param {string} selectedElement - Current selected element ID
 * @param {Object} options - Configuration options
 */
export const useScrollToTopOnSelection = (selectedElement, options = {}) => {
  useScrollToTop({
    selector: ".panel__content", // PropertyPanel content container
    ...options,
    dependencies: [selectedElement],
  });
};
