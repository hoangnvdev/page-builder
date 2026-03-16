import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import {
  applyDirection,
  getDirection,
} from '@/utils/rtl';

/**
 * RTLProvider - Manages RTL/LTR text direction based on current language
 * Automatically updates document direction when language changes
 * Applies smooth transitions for direction changes
 */
export const RTLProvider = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Apply direction when component mounts
    const initialDirection = getDirection(i18n.language);
    applyDirection(i18n.language);

    console.log(
      `🌐 Layout initialized: ${i18n.language.toUpperCase()} (${initialDirection.toUpperCase()})`,
    );

    // Listen for language changes
    const handleLanguageChange = (lng) => {
      const newDirection = getDirection(lng);
      const oldDirection = document.documentElement.getAttribute("dir");

      // Add transition class before changing direction
      if (oldDirection !== newDirection) {
        document.documentElement.classList.add("direction-transition");
      }

      applyDirection(lng);

      console.log(
        `🔄 Language changed: ${lng.toUpperCase()} | Layout: ${newDirection.toUpperCase()}`,
      );

      // Remove transition class after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove("direction-transition");
      }, 300);
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Cleanup listener on unmount
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return children;
};
