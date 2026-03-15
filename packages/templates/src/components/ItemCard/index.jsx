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
  backgroundColor,
  padding,
  borderRadius,
  dropShadow,
  titleSize,
  titleWeight,
  titleColor,
  descriptionSize,
  descriptionWeight,
  descriptionColor,
  textColor,
  gap = 12,
  iconSize,
  align = "flex-start",
  hoverable = false,
  onClick,
  className = "",
  dataElement,
  children,
  ...props
}) => {
  return (
    <Card
      className={`item-card ${className}`}
      hoverable={hoverable}
      onClick={onClick}
      style={{
        ...(backgroundColor && { backgroundColor }),
        ...(padding && { padding: 0 }), // Remove default padding
        ...(borderRadius && { borderRadius }),
        ...(dropShadow && {
          boxShadow: dropShadow !== "none" ? dropShadow : "none",
        }),
      }}
      {...props}
    >
      <Card.Content
        style={{
          ...(padding && { padding }), // Apply custom padding here
          ...(align && { textAlign: align }),
        }}
        data-element={dataElement}
      >
        <Flex direction="column" gap={gap}>
          {icon && (
            <div
              className="item-card__icon"
              style={iconSize ? { fontSize: iconSize } : undefined}
              data-element={dataElement ? `${dataElement}.icon` : undefined}
            >
              {icon}
            </div>
          )}
          {title && (
            <Card.Title
              className="item-card__title"
              style={{
                ...(titleSize && { fontSize: titleSize }),
                ...(titleWeight && { fontWeight: titleWeight }),
                ...(titleColor && { color: titleColor }),
              }}
              data-element={dataElement ? `${dataElement}.title` : undefined}
            >
              {title}
            </Card.Title>
          )}
          {description && (
            <Card.Description
              className="item-card__description"
              style={{
                ...(descriptionSize && { fontSize: descriptionSize }),
                ...(descriptionWeight && { fontWeight: descriptionWeight }),
                ...(descriptionColor && { color: descriptionColor }),
                ...(textColor && !descriptionColor && { color: textColor }),
              }}
              data-element={dataElement ? `${dataElement}.content` : undefined}
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
  title: PropTypes.string,
  description: PropTypes.string,
  backgroundColor: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  dropShadow: PropTypes.string,
  titleSize: PropTypes.string,
  titleWeight: PropTypes.string,
  titleColor: PropTypes.string,
  descriptionSize: PropTypes.string,
  descriptionWeight: PropTypes.string,
  descriptionColor: PropTypes.string,
  textColor: PropTypes.string,
  gap: PropTypes.number,
  iconSize: PropTypes.string,
  align: PropTypes.string,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  dataElement: PropTypes.string,
  children: PropTypes.node,
};
