import "./index.scss";

import PropTypes from "prop-types";

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
