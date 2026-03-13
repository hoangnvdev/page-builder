import "./index.scss";

import PropTypes from "prop-types";

export const Select = ({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  error,
  helperText,
  required = false,
  placeholder,
  className = "",
  style,
  ...props
}) => {
  const selectClasses = [
    "select__field",
    error && "select__field--error",
    disabled && "select__field--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="select" style={style}>
      {label && (
        <label className="select__label">
          {label}
          {required && <span className="select__required">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select__error-text">{error}</span>}
      {helperText && !error && (
        <span className="select__helper-text">{helperText}</span>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
