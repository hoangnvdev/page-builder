import './index.scss';

import React from 'react';

import PropTypes from 'prop-types';

export const Toggle = ({
  value = false,
  onChange,
  label,
  disabled = false,
  className = "",
  size = "medium",
  ...props
}) => {
  const handleChange = (e) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={`toggle ${className}`}>
      <label
        className={`toggle__wrapper toggle__wrapper--${size} ${disabled ? "disabled" : ""}`}
      >
        <input
          type="checkbox"
          checked={value}
          onChange={handleChange}
          disabled={disabled}
          className="toggle__input"
          {...props}
        />
        <span className="toggle__slider"></span>
        {label && <span className="toggle__label">{label}</span>}
      </label>
    </div>
  );
};

Toggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
