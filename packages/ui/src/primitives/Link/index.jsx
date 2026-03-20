import './index.scss';

import { useCallback } from 'react';

import PropTypes from 'prop-types';

export const Link = ({
  children,
  href = "#",
  color,
  underline = false,
  external = false,
  className = "",
  style,
  onClick,
  ...props
}) => {
  const linkClasses = ["link", underline && "link--underline", className]
    .filter(Boolean)
    .join(" ");

  const linkStyle = {
    color,
    ...style,
  };

  // Handle navigation with proper smooth scrolling for anchors
  const handleClick = useCallback(
    (e) => {
      // If custom onClick provided, use it
      if (onClick) {
        onClick(e);
        if (e.defaultPrevented) return;
      }

      // For internal anchors (smooth scroll) - but not just "#"
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
      // For external URLs, let default behavior handle it
      // For relative URLs, let default behavior handle it
    },
    [href, onClick],
  );

  // Determine if link should open in new tab
  const isExternal =
    external ||
    (href &&
      (href.startsWith("http://") || href.startsWith("https://")) &&
      !href.includes(window.location.hostname));

  return (
    <a
      href={href}
      className={linkClasses}
      style={linkStyle}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={handleClick}
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
  onClick: PropTypes.func,
};
