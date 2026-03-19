import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = (
  key,
  initialValue,
  { serializer = JSON.stringify, deserializer = JSON.parse } = {},
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        window.localStorage.setItem(key, serializer(valueToStore));

        window.dispatchEvent(
          new CustomEvent("localStorageChange", {
            detail: { key, value: valueToStore },
          }),
        );
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue],
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);

      window.dispatchEvent(
        new CustomEvent("localStorageChange", {
          detail: { key, value: null },
        }),
      );
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key || e.detail?.key === key) {
        try {
          const newValue = e.detail ? e.detail.value : deserializer(e.newValue);
          setStoredValue(newValue ?? initialValue);
        } catch (error) {
          console.error(`Error handling storage change for "${key}":`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, [key, initialValue, deserializer]);

  return [storedValue, setValue, removeValue];
};
