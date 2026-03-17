import './index.scss';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ChevronDown,
  Languages,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  {
    code: "en",
    label: "English",
    flagImage: () =>
      import("@/assets/images/united-states-of-america-flag-png-small.png"),
    direction: "ltr",
  },
  {
    code: "vi",
    label: "Tiếng Việt",
    flagImage: () => import("@/assets/images/vietnam-flag-png-small.png"),
    direction: "ltr",
  },
  {
    code: "ja",
    label: "日本語",
    flagImage: () => import("@/assets/images/japan-flag-png-small.png"),
    direction: "ltr",
  },
  {
    code: "ar",
    label: "العربية",
    flagImage: () => import("@/assets/images/saudi-arabia-flag-png-small.png"),
    direction: "rtl",
  },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [flagImages, setFlagImages] = useState({});
  const dropdownRef = useRef(null);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.language.split("-")[0]) ||
    LANGUAGES[0];

  // Load flag images dynamically
  useEffect(() => {
    const loadFlags = async () => {
      const images = {};
      for (const lang of LANGUAGES) {
        const module = await lang.flagImage();
        images[lang.code] = module.default;
      }
      setFlagImages(images);
    };
    loadFlags();
  }, []);

  const handleLanguageChange = useCallback(
    (languageCode) => {
      i18n.changeLanguage(languageCode);
      setIsOpen(false);
    },
    [i18n],
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-switcher__trigger"
        onClick={toggleDropdown}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Languages className="language-switcher__language-icon" size={20} />
        {flagImages[currentLanguage.code] && (
          <img
            src={flagImages[currentLanguage.code]}
            alt={`${currentLanguage.label} flag`}
            width="24"
            height="16"
            className="language-switcher__flag-image"
          />
        )}
        <span className="language-switcher__label">
          {currentLanguage.label}
        </span>
        <ChevronDown
          className={`language-switcher__icon ${isOpen ? "language-switcher__icon--open" : ""}`}
          size={16}
        />
      </button>

      {isOpen && (
        <div className="language-switcher__dropdown">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`language-switcher__option ${
                lang.code === currentLanguage.code
                  ? "language-switcher__option--active"
                  : ""
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              title={`${lang.label} - ${lang.direction.toUpperCase()} layout`}
            >
              {flagImages[lang.code] && (
                <img
                  src={flagImages[lang.code]}
                  alt={`${lang.label} flag`}
                  width="24"
                  height="16"
                  className="language-switcher__flag-image"
                />
              )}
              <span className="language-switcher__option-label">
                {lang.label}
              </span>
              <span
                className={`language-switcher__direction-badge language-switcher__direction-badge--${lang.direction}`}
              >
                {lang.direction.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
