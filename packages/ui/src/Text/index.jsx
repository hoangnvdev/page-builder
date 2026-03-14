import './index.scss';

import PropTypes from 'prop-types';

export const Text = ({
  children,
  size = "medium",
  weight = "normal",
  align = "left",
  color,
  as = "p",
  className = "",
  style,
  ...props
}) => {
  const Component = as;

  const textClasses = [
    "text",
    `text--${size}`,
    `text--${weight}`,
    `text--align-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textStyle = {
    ...(color && { color }),
    ...style,
  };

  return (
    <Component className={textClasses} style={textStyle} {...props}>
      {children}
    </Component>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  weight: PropTypes.oneOf(["light", "normal", "medium", "bold"]),
  align: PropTypes.oneOf(["left", "center", "right", "justify"]),
  color: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
