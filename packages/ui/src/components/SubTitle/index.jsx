import "./index.scss";

import PropTypes from "prop-types";

export const SubTitle = ({ children, className = "", style, ...props }) => {
  const subTitleClasses = ["subtitle", className].filter(Boolean).join(" ");

  return (
    <p className={subTitleClasses} style={style} {...props}>
      {children}
    </p>
  );
};

SubTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};
