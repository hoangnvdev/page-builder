import "./index.scss";

import PropTypes from "prop-types";

const RadioItem = ({ id, name, value, checked, onChange, label, disabled }) => {
  const itemClasses = [
    "radio__item",
    checked && "radio__item--checked",
    disabled && "radio__item--disabled",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={itemClasses}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="radio__input"
      />
      <span className="radio__control"></span>
      <span className="radio__label">{label}</span>
    </label>
  );
};

RadioItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

const RadioGroup = ({
  id,
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  orientation = "vertical",
  className = "",
  ...props
}) => {
  return (
    <div className={`radio-group ${className}`} {...props}>
      {label && <div className="radio-group__label">{label}</div>}
      <div
        className={`radio-group__options radio-group__options--${orientation}`}
      >
        {options.map((option, index) => (
          <RadioItem
            key={option.value}
            id={`${id}-${option.value}`}
            name={id}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            label={option.label}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

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
  disabled: PropTypes.bool,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  className: PropTypes.string,
};

export const Radio = {
  Group: RadioGroup,
  Item: RadioItem,
};
