import { useEffect, useRef, useState } from "react";

export const useIsVisible = ({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  triggerOnce = true,
} = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            // If triggerOnce, disconnect observer after first trigger
            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            // If not triggerOnce, allow toggle back to not visible
            setIsVisible(false);
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    // Start observing
    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return [elementRef, isVisible];
};
