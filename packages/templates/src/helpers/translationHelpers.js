/**
 * Translation Helper Functions for Templates
 *
 * These helpers work with the shared i18n instance from the app.
 * They can be used in two ways:
 *
 * 1. In React components: Use the useTranslation hook directly
 * 2. In utility functions: Pass the i18n instance as a parameter
 *
 * Example usage:
 * ```javascript
 * import { useTranslation } from 'react-i18next';
 * import { getTranslatedTemplateMetadata } from './translationHelpers';
 *
 * const MyComponent = () => {
 *   const { i18n } = useTranslation();
 *   const metadata = getTranslatedTemplateMetadata(i18n, 'businessPro');
 *   // ...
 * };
 * ```
 */

/**
 * Get translated template metadata
 * @param {object} i18n - The i18next instance from useTranslation hook
 * @param {string} templateId - The template ID (e.g., 'businessPro', 'comicSplash')
 * @returns {object} Object with translated name and description
 */
export const getTranslatedTemplateMetadata = (i18n, templateId) => {
  return {
    name: i18n.t(`templates.${templateId}.name`),
    description: i18n.t(`templates.${templateId}.description`),
  };
};

/**
 * Get translated field label
 * @param {object} i18n - The i18next instance from useTranslation hook
 * @param {string} fieldKey - The field key (e.g., 'fontFamily', 'pageBackground')
 * @returns {string} Translated field label
 */
export const getTranslatedFieldLabel = (i18n, fieldKey) => {
  return i18n.t(`fields.${fieldKey}`);
};

/**
 * Get translated option label
 * @param {object} i18n - The i18next instance from useTranslation hook
 * @param {string} optionKey - The option key (e.g., 'left', 'center', 'arial')
 * @returns {string} Translated option label
 */
export const getTranslatedOptionLabel = (i18n, optionKey) => {
  return i18n.t(`options.${optionKey}`);
};

/**
 * Get translated default content for a template
 * @param {object} i18n - The i18next instance from useTranslation hook
 * @param {string} templateId - The template ID
 * @param {string} contentKey - The content key (e.g., 'heroTitle', 'aboutHeading')
 * @returns {string} Translated default content
 */
export const getTranslatedTemplateDefault = (i18n, templateId, contentKey) => {
  return i18n.t(`templates.${templateId}.defaults.${contentKey}`);
};

/**
 * Get translated navigation labels
 * @param {object} i18n - The i18next instance from useTranslation hook
 * @param {string} navKey - The navigation key (e.g., 'home', 'about')
 * @returns {string} Translated navigation label
 */
export const getTranslatedNavLabel = (i18n, navKey) => {
  return i18n.t(`nav.${navKey}`);
};

/**
 * Translate template field options array
 * @param {object} i18n - The i18next instance from useTranslation hook
 * @param {Array} options - Array of options with { value, label } structure
 * @returns {Array} Options array with translated labels
 */
export const translateFieldOptions = (i18n, options) => {
  return options.map((option) => ({
    ...option,
    label: option.translationKey ? i18n.t(option.translationKey) : option.label,
  }));
};

export default {
  getTranslatedTemplateMetadata,
  getTranslatedFieldLabel,
  getTranslatedOptionLabel,
  getTranslatedTemplateDefault,
  getTranslatedNavLabel,
  translateFieldOptions,
};
