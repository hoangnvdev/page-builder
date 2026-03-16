import "./index.scss";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const ColorPicker = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  error,
  helperText,
  required = false,
  placeholder,
  className = "",
  style,
  ...props
}) => {
  const { t } = useTranslation();

  const handleColorChange = (newColor) => {
    // Allow transparent or valid hex colors
    if (newColor === "transparent" || /^#[0-9A-F]{6}$/i.test(newColor)) {
      onChange(newColor);
    } else if (newColor === "") {
      onChange("transparent");
    } else {
      onChange(newColor);
    }
  };

  return (
    <div className={`color-picker ${className}`} style={style}>
      {label && (
        <label className="color-picker__label" htmlFor={id}>
          {label}
          {required && <span className="color-picker__required">*</span>}
        </label>
      )}
      <div className="color-picker__input-group">
        <input
          id={id}
          name={id}
          type="color"
          value={value === "transparent" ? "#000000" : value || "#000000"}
          onChange={(e) => handleColorChange(e.target.value)}
          disabled={disabled}
          className="color-picker__color-input"
          {...props}
        />
        <input
          id={`${id}-text`}
          name={`${id}-text`}
          type="text"
          value={value || ""}
          onChange={(e) => handleColorChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder || t("ui.colorPicker.placeholder")}
          className={`color-picker__text-input ${error ? "color-picker__text-input--error" : ""}`}
        />
      </div>
      {error && <span className="color-picker__error-text">{error}</span>}
      {helperText && !error && (
        <span className="color-picker__helper-text">{helperText}</span>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
