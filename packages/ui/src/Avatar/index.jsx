import './index.scss';

import PropTypes from 'prop-types';

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

  return (
    <div className={avatarClasses} style={avatarStyle} {...props}>
      {src ? (
        <img src={src} alt={alt} className="avatar__image" />
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
