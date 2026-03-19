import { createContext, useContext, useEffect, useMemo } from "react";

import PropTypes from "prop-types";

import { useLocalStorage } from "@/hooks";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children, defaultTheme = "light" }) => {
  // Custom serializers to handle plain strings (for backward compatibility)
  const [theme, setTheme] = useLocalStorage("theme", defaultTheme, {
    serializer: (value) => value, // Store as plain string
    deserializer: (value) => {
      // Handle both JSON strings and plain strings
      try {
        return JSON.parse(value);
      } catch {
        // If parsing fails, it's already a plain string
        return value;
      }
    },
  });

  // Apply theme to document root for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    // Also update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#1a1a1a" : "#ffffff",
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setLightTheme = () => setTheme("light");
  const setDarkTheme = () => setTheme("dark");

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      setLightTheme,
      setDarkTheme,
      isDark: theme === "dark",
      isLight: theme === "light",
    }),
    [theme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(["light", "dark"]),
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
