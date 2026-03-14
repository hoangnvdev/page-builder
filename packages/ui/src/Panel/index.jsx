import "./index.scss";

import PropTypes from "prop-types";

export const Panel = ({
  children,
  width,
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
    ...(width !== undefined && {
      width: typeof width === "number" ? `${width}px` : width,
    }),
  };

  return (
    <div className={panelClasses} style={panelStyle} {...rest}>
      {children}
    </div>
  );
};

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
