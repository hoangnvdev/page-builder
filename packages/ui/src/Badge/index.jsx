import './index.scss';

import PropTypes from 'prop-types';

export const Badge = ({
  children,
  variant = "default",
  size = "medium",
  color,
  backgroundColor,
  className = "",
  style,
  ...props
}) => {
  const badgeClasses = [
    "badge",
    `badge--${variant}`,
    `badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const badgeStyle = {
    ...(color && { color }),
    ...(backgroundColor && { backgroundColor }),
    ...style,
  };

  return (
    <span className={badgeClasses} style={badgeStyle} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "default",
    "primary",
    "success",
    "warning",
    "danger",
    "info",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
