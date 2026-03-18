import "./index.scss";

import PropTypes from "prop-types";

export const Container = ({
  children,
  maxWidth = "1200px",
  padding = "0 20px",
  className = "",
  style,
  ...props
}) => {
  const containerClasses = ["container", className].filter(Boolean).join(" ");

  const containerStyle = {
    maxWidth,
    padding,
    margin: "0 auto",
    ...style,
  };

  return (
    <div className={containerClasses} style={containerStyle} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  padding: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
