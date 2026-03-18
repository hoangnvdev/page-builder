import "./index.scss";

import PropTypes from "prop-types";

const defaultImage = new URL(
  "../../assets/images/default-image.png",
  import.meta.url,
).href;

export const Image = ({
  src,
  alt = "",
  width,
  height,
  fit = "cover",
  position = "center",
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
      <img
        src={src || defaultImage}
        alt={alt}
        width={width || 300}
        height={height || 200}
        className="image__img"
        style={imgStyle}
      />
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
  className: PropTypes.string,
  style: PropTypes.object,
};
