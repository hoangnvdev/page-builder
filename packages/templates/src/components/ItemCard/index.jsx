import './index.scss';

import PropTypes from 'prop-types';

import {
  Card,
  Flex,
} from '@page-builder/ui';

export const ItemCard = ({
  icon,
  title,
  description,
  titleColor,
  textColor,
  gap = 12,
  iconSize,
  align = "flex-start",
  hoverable = false,
  onClick,
  className = "",
  children,
  ...props
}) => {
  return (
    <Card
      className={`item-card ${className}`}
      hoverable={hoverable}
      onClick={onClick}
      {...props}
    >
      <Card.Content>
        <Flex direction="column" gap={gap} align={align}>
          {icon && (
            <div
              className="item-card__icon"
              style={iconSize ? { fontSize: iconSize } : undefined}
            >
              {icon}
            </div>
          )}
          {title && (
            <Card.Title
              className="item-card__title"
              style={{ color: titleColor }}
            >
              {title}
            </Card.Title>
          )}
          {description && (
            <Card.Description
              className="item-card__description"
              style={{ color: textColor }}
            >
              {description}
            </Card.Description>
          )}
          {children}
        </Flex>
      </Card.Content>
    </Card>
  );
};

ItemCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  textColor: PropTypes.string,
};
