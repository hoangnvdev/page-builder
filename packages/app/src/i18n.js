import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import {
  localesArAR as templatesArAR,
  localesEnEN as templatesEnEN,
  localesJaJP as templatesJaJP,
  localesVnVN as templatesVnVN,
} from "@page-builder/templates";
import {
  localesArAR as uiArAR,
  localesEnEN as uiEnEN,
  localesJaJP as uiJaJP,
  localesVnVN as uiVnVN,
} from "@page-builder/ui";

import arAR from "./locales/ar-AR.json";
import enEN from "./locales/en-EN.json";
import jaJP from "./locales/ja-JP.json";
import vnVN from "./locales/vn-VN.json";

// Merge all translations into one object for each language
const mergedEnTranslations = {
  ...enEN,
  ...templatesEnEN,
  ui: uiEnEN,
};

const mergedVnTranslations = {
  ...vnVN,
  ...templatesVnVN,
  ui: uiVnVN,
};

const mergedArTranslations = {
  ...arAR,
  ...templatesArAR,
  ui: uiArAR,
};

const mergedJaTranslations = {
  ...jaJP,
  ...templatesJaJP,
  ui: uiJaJP,
};

// Language metadata including RTL support
export const LANGUAGE_CONFIG = {
  en: { dir: "ltr", name: "English" },
  vi: { dir: "ltr", name: "Tiếng Việt" },
  ja: { dir: "ltr", name: "日本語" }, // Japanese - LTR
  ar: { dir: "rtl", name: "العربية" }, // Arabic - RTL
  he: { dir: "rtl", name: "עברית" }, // Hebrew - RTL
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: mergedEnTranslations,
      },
      vi: {
        translation: mergedVnTranslations,
      },
      ja: {
        translation: mergedJaTranslations,
      },
      ar: {
        translation: mergedArTranslations,
      },
    },
    fallbackLng: "en",

    // Language detection configuration
    detection: {
      // Order of detection methods
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      // Where to cache the detected language
      caches: ["localStorage", "cookie"],
      // Query string parameter name
      lookupQuerystring: "lng",
      // Cookie name
      lookupCookie: "i18next",
      // localStorage key
      lookupLocalStorage: "i18nextLng",
      // Cookie options
      cookieMinutes: 525600, // 1 year
      cookieDomain: undefined,
    },

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
