import "./index.scss";

import PropTypes from "prop-types";

import { withMemo } from "@/hocs";

const TitleComponent = ({
  children,
  level = 1,
  className = "",
  style,
  ...props
}) => {
  const Tag = `h${level}`;

  const titleClasses = ["title", `title--${level}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={titleClasses} style={style} {...props}>
      {children}
    </Tag>
  );
};

TitleComponent.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
  style: PropTypes.object,
};

export const Title = withMemo(TitleComponent);
