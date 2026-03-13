import "./index.scss";

import PropTypes from "prop-types";

import { SubTitle, Title } from "@page-builder/ui";

export const ItemCard = ({
  icon,
  title,
  description,
  titleColor,
  textColor,
}) => {
  return (
    <div className="item-card">
      {icon && <div className="item-card__icon">{icon}</div>}
      <Title
        level={4}
        className="item-card__title"
        style={{ fontSize: "1.3rem", marginBottom: "10px", color: titleColor }}
      >
        {title}
      </Title>
      <SubTitle
        className="item-card__description"
        style={{ fontSize: "1rem", color: textColor, lineHeight: "1.6" }}
      >
        {description}
      </SubTitle>
    </div>
  );
};

ItemCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  textColor: PropTypes.string,
};
