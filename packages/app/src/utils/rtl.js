// RTL (Right-to-Left) language configuration
// Languages that use RTL text direction
export const RTL_LANGUAGES = ["ar", "he", "fa", "ur"]; // Arabic, Hebrew, Persian, Urdu

/**
 * Check if a language code is RTL
 * @param {string} languageCode - Language code (e.g., 'ar', 'en')
 * @returns {boolean} - True if the language is RTL
 */
export const isRTL = (languageCode) => {
  const lang = languageCode.split("-")[0].toLowerCase();
  return RTL_LANGUAGES.includes(lang);
};

/**
 * Get text direction for a language
 * @param {string} languageCode - Language code
 * @returns {string} - 'rtl' or 'ltr'
 */
export const getDirection = (languageCode) => {
  return isRTL(languageCode) ? "rtl" : "ltr";
};

/**
 * Apply text direction to document
 * @param {string} languageCode - Language code
 */
export const applyDirection = (languageCode) => {
  const direction = getDirection(languageCode);
  document.documentElement.setAttribute("dir", direction);
  document.documentElement.setAttribute("lang", languageCode);
};
