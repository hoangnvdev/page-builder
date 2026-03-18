import "./index.scss";

import PropTypes from "prop-types";

export const Flex = ({
  children,
  direction = "row",
  wrap = "nowrap",
  justify = "flex-start",
  align = "stretch",
  alignContent,
  gap,
  vertical = false,
  inline = false,
  flex,
  as = "div",
  style = {},
  className = "",
  ...props
}) => {
  const Component = as;

  // Build className string
  const flexClasses = [
    "flex",
    inline && "flex--inline",
    `flex--${vertical ? "column" : direction}`,
    `flex--${wrap}`,
    `flex--justify-${justify}`,
    `flex--align-${align}`,
    alignContent && `flex--align-content-${alignContent}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Handle dynamic inline styles for gap and flex
  const dynamicStyles = {
    ...(gap !== undefined && {
      gap: typeof gap === "number" ? `${gap}px` : gap,
    }),
    ...(flex !== undefined && { flex: typeof flex === "number" ? flex : flex }),
    ...style,
  };

  return (
    <Component className={flexClasses} style={dynamicStyles} {...props}>
      {children}
    </Component>
  );
};

Flex.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOf([
    "row",
    "row-reverse",
    "column",
    "column-reverse",
  ]),
  wrap: PropTypes.oneOf(["nowrap", "wrap", "wrap-reverse"]),
  justify: PropTypes.oneOf([
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "start",
    "end",
    "left",
    "right",
  ]),
  align: PropTypes.oneOf([
    "flex-start",
    "flex-end",
    "center",
    "baseline",
    "stretch",
    "start",
    "end",
    "self-start",
    "self-end",
  ]),
  alignContent: PropTypes.oneOf([
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "stretch",
    "start",
    "end",
  ]),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  vertical: PropTypes.bool,
  inline: PropTypes.bool,
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
};
