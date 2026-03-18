import "./index.scss";

import PropTypes from "prop-types";

const defaultImage = new URL(
  "../../assets/images/default-image.png",
  import.meta.url,
).href;

export const Avatar = ({
  src,
  alt = "",
  size = "medium",
  shape = "circle",
  children,
  backgroundColor,
  color,
  className = "",
  style,
  ...props
}) => {
  const avatarClasses = [
    "avatar",
    `avatar--${size}`,
    `avatar--${shape}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const avatarStyle = {
    ...(backgroundColor && { backgroundColor }),
    ...(color && { color }),
    ...style,
  };

  // Map size to dimensions
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 96,
  };
  const dimension = sizeMap[size] || 48;

  return (
    <div className={avatarClasses} style={avatarStyle} {...props}>
      {src || !children ? (
        <img
          src={src || defaultImage}
          alt={alt}
          width={dimension}
          height={dimension}
          className="avatar__image"
        />
      ) : (
        <span className="avatar__placeholder">{children}</span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large", "xlarge"]),
  shape: PropTypes.oneOf(["circle", "square"]),
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
