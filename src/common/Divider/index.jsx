import "./index.scss";

import PropTypes from "prop-types";

/**
 * Divider component for horizontal or vertical separators
 * @param {Object} props
 * @param {string} props.orientation - 'horizontal' | 'vertical' (default: 'horizontal')
 * @param {string} props.variant - 'solid' | 'dashed' | 'dotted' (default: 'solid')
 * @param {string} props.thickness - Divider thickness (e.g., '1px', 1)
 * @param {string} props.color - Divider color
 * @param {string|number} props.spacing - Spacing around divider (e.g., '16px', 16)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
export const Divider = ({
  orientation = "horizontal",
  variant = "solid",
  thickness = "1px",
  color = "#e0e0e0",
  spacing,
  className = "",
  style = {},
  ...rest
}) => {
  const dividerClasses = [
    "divider",
    `divider--${orientation}`,
    `divider--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const dividerStyle = {
    ...style,
    ...(color && {
      [orientation === "horizontal" ? "borderTopColor" : "borderLeftColor"]:
        color,
    }),
    ...(thickness && {
      [orientation === "horizontal" ? "borderTopWidth" : "borderLeftWidth"]:
        typeof thickness === "number" ? `${thickness}px` : thickness,
    }),
    ...(spacing &&
      (orientation === "horizontal"
        ? {
            marginTop: typeof spacing === "number" ? `${spacing}px` : spacing,
            marginBottom:
              typeof spacing === "number" ? `${spacing}px` : spacing,
          }
        : {
            marginLeft: typeof spacing === "number" ? `${spacing}px` : spacing,
            marginRight: typeof spacing === "number" ? `${spacing}px` : spacing,
          })),
  };

  return <div className={dividerClasses} style={dividerStyle} {...rest} />;
};

Divider.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  variant: PropTypes.oneOf(["solid", "dashed", "dotted"]),
  thickness: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
};
