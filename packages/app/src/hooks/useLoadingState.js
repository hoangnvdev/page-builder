import { useCallback, useState } from "react";

export const useLoadingState = (initialLoading = false) => {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const withLoading = useCallback(
    (asyncFn) => {
      return async (...args) => {
        try {
          startLoading();
          const result = await asyncFn(...args);
          stopLoading();
          return result;
        } catch (err) {
          setError(err.message || "An error occurred");
          stopLoading();
          throw err;
        }
      };
    },
    [startLoading, stopLoading],
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    loading,
    error,
    setLoading,
    setError,
    startLoading,
    stopLoading,
    withLoading,
    reset,
  };
};
