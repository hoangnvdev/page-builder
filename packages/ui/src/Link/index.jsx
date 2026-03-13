import "./index.scss";

import PropTypes from "prop-types";

export const Link = ({
  children,
  href = "#",
  color,
  underline = false,
  external = false,
  className = "",
  style,
  ...props
}) => {
  const linkClasses = ["link", underline && "link--underline", className]
    .filter(Boolean)
    .join(" ");

  const linkStyle = {
    color,
    ...style,
  };

  return (
    <a
      href={href}
      className={linkClasses}
      style={linkStyle}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  color: PropTypes.string,
  underline: PropTypes.bool,
  external: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
