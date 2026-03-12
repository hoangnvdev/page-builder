import "./index.scss";

import PropTypes from "prop-types";

export const Card = ({
  children,
  hoverable = false,
  onClick,
  className = "",
  style,
  ...props
}) => {
  const cardClasses = [
    "card",
    hoverable && "card--hoverable",
    onClick && "card--clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} onClick={onClick} style={style} {...props}>
      {children}
    </div>
  );
};

// Sub-components
Card.Image = ({ src, alt, height = 280, children, style, ...props }) => (
  <div className="card__image" style={{ height, ...style }} {...props}>
    {src ? <img src={src} alt={alt} /> : children}
  </div>
);

Card.Content = ({ children, className = "", style, ...props }) => (
  <div className={`card__content ${className}`} style={style} {...props}>
    {children}
  </div>
);

Card.Title = ({ children, className = "", style, ...props }) => (
  <h3 className={`card__title ${className}`} style={style} {...props}>
    {children}
  </h3>
);

Card.Description = ({ children, className = "", style, ...props }) => (
  <p className={`card__description ${className}`} style={style} {...props}>
    {children}
  </p>
);

Card.Actions = ({ children, className = "", style, ...props }) => (
  <div className={`card__actions ${className}`} style={style} {...props}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

Card.Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
  style: PropTypes.object,
};

Card.Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

Card.Title.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

Card.Description.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

Card.Actions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};
