import "./index.scss";

import PropTypes from "prop-types";

export const Label = ({
  children,
  htmlFor,
  required = false,
  disabled = false,
  className = "",
  style,
  ...props
}) => {
  const labelClasses = ["label", disabled && "label--disabled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <label htmlFor={htmlFor} className={labelClasses} style={style} {...props}>
      {children}
      {required && <span className="label__required">*</span>}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
