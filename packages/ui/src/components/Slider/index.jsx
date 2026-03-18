import "./index.scss";

import React from "react";

import PropTypes from "prop-types";

export const Slider = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onBlur,
  label,
  labels = [],
  disabled = false,
  className = "",
  showValue = false,
  ...props
}) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange?.(newValue);
  };

  const handleBlur = (e) => {
    if (onBlur) {
      const newValue = parseFloat(e.target.value);
      onBlur(newValue);
    }
  };

  // Get the label for current value if labels array is provided
  const getCurrentLabel = () => {
    if (!labels || labels.length === 0) return value;

    const index = Math.round((value - min) / step);
    return labels[index] || value;
  };

  return (
    <div className={`slider ${className}`}>
      {label && <label className="slider__label">{label}</label>}

      <div className="slider__wrapper">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="slider__input"
          {...props}
        />

        {(showValue || labels.length > 0) && (
          <div className="slider__value">{getCurrentLabel()}</div>
        )}
      </div>

      {labels && labels.length > 0 && (
        <div className="slider__labels">
          {labels.map((labelText, index) => (
            <span
              key={index}
              className={`slider__label-item ${
                index === Math.round((value - min) / step) ? "active" : ""
              }`}
            >
              {labelText}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

Slider.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showValue: PropTypes.bool,
};
