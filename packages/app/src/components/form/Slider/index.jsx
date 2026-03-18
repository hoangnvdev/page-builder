import "./index.scss";

import React, { useRef } from "react";

import PropTypes from "prop-types";

export const Slider = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onChangeEnd,
  label,
  labels = [],
  disabled = false,
  className = "",
  showValue = false,
  ...props
}) => {
  const isInteractingRef = useRef(false);

  const handleMouseDown = () => {
    isInteractingRef.current = true;
  };

  const handleTouchStart = () => {
    isInteractingRef.current = true;
  };

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange?.(newValue);
  };

  const handleMouseUp = (e) => {
    if (isInteractingRef.current && onChangeEnd) {
      const newValue = parseFloat(e.target.value);
      onChangeEnd(newValue);
      isInteractingRef.current = false;
    }
  };

  const handleTouchEnd = (e) => {
    if (isInteractingRef.current && onChangeEnd) {
      const newValue = parseFloat(e.target.value);
      onChangeEnd(newValue);
      isInteractingRef.current = false;
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
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleTouchEnd}
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
  onChangeEnd: PropTypes.func,
  label: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showValue: PropTypes.bool,
};
