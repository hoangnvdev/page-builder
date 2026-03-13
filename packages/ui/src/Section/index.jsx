import "./index.scss";

import PropTypes from "prop-types";

export const Section = ({
  children,
  padding = "80px 20px",
  backgroundColor,
  as = "section",
  className = "",
  style,
  dataElement,
  ...props
}) => {
  const Component = as;

  const sectionClasses = ["section", className].filter(Boolean).join(" ");

  const sectionStyle = {
    padding,
    backgroundColor,
    ...style,
  };

  return (
    <Component
      className={sectionClasses}
      style={sectionStyle}
      data-element={dataElement}
      {...props}
    >
      {children}
    </Component>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.string,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  dataElement: PropTypes.string,
};
