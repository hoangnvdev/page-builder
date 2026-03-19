import { useCallback, useEffect, useRef, useState } from "react";

export const useApiFetch = (
  fetchFn,
  { immediate = true, onSuccess, onError } = {},
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFn(...args);

        if (mountedRef.current) {
          setData(result);
          onSuccess?.(result);
        }

        return result;
      } catch (err) {
        if (mountedRef.current) {
          const errorMessage = err.message || "An error occurred";
          setError(errorMessage);
          onError?.(err);
        }
        throw err;
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    [fetchFn, onSuccess, onError],
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute,
  };
};
