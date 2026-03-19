import { useCallback } from "react";

/**
 * Hook for handling navigation
 * Supports:
 * - Internal anchors (smooth scroll) - e.g., #about, #features
 * - External URLs (new tab) - e.g., https://example.com
 * - Relative URLs (same tab) - e.g., /page, /about
 */
export const useNavigation = () => {
  /**
   * Navigate to a URL or anchor
   * @param {string} url - The URL or anchor to navigate to
   */
  const navigate = useCallback((url) => {
    if (!url) return;

    // Internal anchor (e.g., #about, #features)
    if (url.startsWith("#")) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return;
    }

    // External URL (starts with http:// or https://)
    if (url.startsWith("http://") || url.startsWith("https://")) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // Relative URL (same tab)
    window.location.href = url;
  }, []);

  /**
   * Get props for anchor/button elements
   * Returns appropriate href and onClick handlers based on URL type
   * @param {string} url - The URL or anchor
   * @returns {Object} Props object with href, onClick, target, rel
   */
  const getNavigationProps = useCallback(
    (url) => {
      if (!url) return {};

      // For anchors (smooth scroll)
      if (url.startsWith("#")) {
        return {
          href: url,
          onClick: (e) => {
            e.preventDefault();
            navigate(url);
          },
        };
      }

      // For external links (new tab with security)
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return {
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
        };
      }

      // For relative URLs
      return {
        href: url,
      };
    },
    [navigate],
  );

  return { navigate, getNavigationProps };
};
