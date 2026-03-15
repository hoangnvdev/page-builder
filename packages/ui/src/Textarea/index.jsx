import './index.scss';

import PropTypes from 'prop-types';

export const Textarea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  helperText,
  required = false,
  rows = 4,
  className = "",
  style,
  ...props
}) => {
  const textareaClasses = [
    "textarea__field",
    error && "textarea__field--error",
    disabled && "textarea__field--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="textarea" style={style}>
      {label && (
        <label className="textarea__label" htmlFor={id}>
          {label}
          {required && <span className="textarea__required">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      {error && <span className="textarea__error-text">{error}</span>}
      {helperText && !error && (
        <span className="textarea__helper-text">{helperText}</span>
      )}
    </div>
  );
};

Textarea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};
