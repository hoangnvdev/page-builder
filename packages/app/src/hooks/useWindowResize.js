import { useEffect, useLayoutEffect } from "react";

export const useWindowResize = (
  callback,
  deps = [],
  { debounceMs = 0, useLayout = true } = {},
) => {
  const effect = useLayout ? useLayoutEffect : useEffect;

  effect(() => {
    let timeoutId;

    const handleResize = () => {
      if (debounceMs > 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, debounceMs);
      } else {
        callback();
      }
    };

    callback();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, deps);
};
