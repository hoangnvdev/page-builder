import "./index.scss";

import PropTypes from "prop-types";

/**
 * Toolbar component for top navigation bars with left/right sections
 * @param {Object} props
 * @param {React.ReactNode} props.children - Toolbar content
 * @param {string} props.height - Toolbar height (e.g., '60px', 60)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
export const Toolbar = ({
  children,
  height = "60px",
  className = "",
  style = {},
  ...rest
}) => {
  const toolbarClasses = ["toolbar", className].filter(Boolean).join(" ");

  const toolbarStyle = {
    ...style,
    ...(height && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
  };

  return (
    <div className={toolbarClasses} style={toolbarStyle} {...rest}>
      {children}
    </div>
  );
};

/**
 * Toolbar.Left component for left-aligned toolbar content
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
Toolbar.Left = function ToolbarLeft({
  children,
  className = "",
  style = {},
  ...rest
}) {
  const leftClasses = ["toolbar__left", className].filter(Boolean).join(" ");

  return (
    <div className={leftClasses} style={style} {...rest}>
      {children}
    </div>
  );
};

/**
 * Toolbar.Right component for right-aligned toolbar content
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
Toolbar.Right = function ToolbarRight({
  children,
  className = "",
  style = {},
  ...rest
}) {
  const rightClasses = ["toolbar__right", className].filter(Boolean).join(" ");

  return (
    <div className={rightClasses} style={style} {...rest}>
      {children}
    </div>
  );
};

/**
 * Toolbar.Center component for center-aligned toolbar content
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
Toolbar.Center = function ToolbarCenter({
  children,
  className = "",
  style = {},
  ...rest
}) {
  const centerClasses = ["toolbar__center", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={centerClasses} style={style} {...rest}>
      {children}
    </div>
  );
};

Toolbar.propTypes = {
  children: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
};

Toolbar.Left.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

Toolbar.Right.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

Toolbar.Center.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};
