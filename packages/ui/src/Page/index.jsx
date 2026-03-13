import "./index.scss";

import PropTypes from "prop-types";

export const Page = ({
  children,
  fontFamily,
  backgroundColor,
  textColor,
  minHeight = "100vh",
  className = "",
  style,
  ...props
}) => {
  const pageClasses = ["page", className].filter(Boolean).join(" ");

  const pageStyle = {
    fontFamily,
    backgroundColor,
    color: textColor,
    minHeight,
    ...style,
  };

  return (
    <div className={pageClasses} style={pageStyle} {...props}>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  fontFamily: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  minHeight: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
