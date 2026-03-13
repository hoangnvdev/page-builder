import "./index.scss";

import PropTypes from "prop-types";

/**
 * Panel component for sidebars and content panels
 * @param {Object} props
 * @param {React.ReactNode} props.children - Panel content
 * @param {string} props.width - Panel width (e.g., '300px', '25%')
 * @param {string} props.position - Panel position: 'left' | 'right'
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
export const Panel = ({
  children,
  width = "300px",
  position = "left",
  className = "",
  style = {},
  ...rest
}) => {
  const panelClasses = ["panel", `panel--${position}`, className]
    .filter(Boolean)
    .join(" ");

  const panelStyle = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
  };

  return (
    <div className={panelClasses} style={panelStyle} {...rest}>
      {children}
    </div>
  );
};

/**
 * Panel.Header component for panel headers
 * @param {Object} props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
Panel.Header = function PanelHeader({
  children,
  className = "",
  style = {},
  ...rest
}) {
  const headerClasses = ["panel__header", className].filter(Boolean).join(" ");

  return (
    <div className={headerClasses} style={style} {...rest}>
      {children}
    </div>
  );
};

/**
 * Panel.Content component for scrollable panel content
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
Panel.Content = function PanelContent({
  children,
  className = "",
  style = {},
  ...rest
}) {
  const contentClasses = ["panel__content", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={contentClasses} style={style} {...rest}>
      {children}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  position: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  style: PropTypes.object,
};

Panel.Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

Panel.Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};
