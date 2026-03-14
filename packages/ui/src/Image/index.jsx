import './index.scss';

import PropTypes from 'prop-types';

export const Image = ({
  src,
  alt = "",
  width,
  height,
  fit = "cover",
  position = "center",
  placeholder,
  className = "",
  style,
  ...props
}) => {
  const imageClasses = ["image", `image--fit-${fit}`, className]
    .filter(Boolean)
    .join(" ");

  const imageStyle = {
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
    ...style,
  };

  const imgStyle = {
    objectPosition: position,
  };

  return (
    <div className={imageClasses} style={imageStyle} {...props}>
      {src ? (
        <img src={src} alt={alt} className="image__img" style={imgStyle} />
      ) : (
        <div className="image__placeholder">{placeholder || "▓"}</div>
      )}
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fit: PropTypes.oneOf(["cover", "contain", "fill", "none", "scale-down"]),
  position: PropTypes.string,
  placeholder: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};
