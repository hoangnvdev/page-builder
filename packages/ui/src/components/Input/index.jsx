import "./index.scss";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const Input = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
  error,
  helperText,
  required = false,
  className = "",
  style,
  ...props
}) => {
  const { t } = useTranslation();

  const inputClasses = [
    "input__field",
    error && "input__field--error",
    disabled && "input__field--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input" style={style}>
      {label && (
        <label className="input__label" htmlFor={id}>
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t("ui.input.placeholder")}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {error && <span className="input__error-text">{error}</span>}
      {helperText && !error && (
        <span className="input__helper-text">{helperText}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
