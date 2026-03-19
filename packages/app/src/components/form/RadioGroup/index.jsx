import "./index.scss";

import { memo } from "react";

import PropTypes from "prop-types";

export const RadioGroup = memo(
  ({
    id,
    label,
    value,
    onChange,
    options = [],
    orientation = "vertical",
    className = "",
  }) => {
    const handleChange = (optionValue) => {
      onChange(optionValue);
    };

    return (
      <div className={`radio-group radio-group--${orientation} ${className}`}>
        {label && <label className="radio-group__label">{label}</label>}
        <div className="radio-group__options">
          {options.map((option) => (
            <label
              key={option.value}
              className={`radio-group__option ${value === option.value ? "radio-group__option--selected" : ""}`}
            >
              <input
                type="radio"
                name={id}
                value={option.value}
                checked={value === option.value}
                onChange={() => handleChange(option.value)}
                className="radio-group__input"
              />
              <span className="radio-group__radio" />
              <span className="radio-group__text">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  },
);

RadioGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  className: PropTypes.string,
};

RadioGroup.displayName = "RadioGroup";
