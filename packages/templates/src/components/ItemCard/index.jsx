import "./index.scss";

import { useMemo } from "react";

import PropTypes from "prop-types";

import { Card, Flex } from "@page-builder/ui";

import { formatElementIdForDisplay } from "../../utils/elementHelpers";

export const ItemCard = ({
  icon,
  title,
  description,
  backgroundColor,
  padding,
  borderRadius,
  borderWidth,
  borderColor,
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
  dataElementLabel,
  children,
  ...props
}) => {
  // Memoize card style
  const cardStyle = useMemo(
    () => ({
      ...(backgroundColor && { backgroundColor }),
      ...(padding && { padding: 0 }), // Remove default padding
      ...(borderRadius && { borderRadius }),
      ...(borderWidth && { borderWidth }),
      ...(borderColor && { borderColor }),
      ...(borderWidth || borderColor ? { borderStyle: "solid" } : {}),
      ...(dropShadow && {
        boxShadow: dropShadow !== "none" ? dropShadow : "none",
      }),
    }),
    [
      backgroundColor,
      padding,
      borderRadius,
      borderWidth,
      borderColor,
      dropShadow,
    ],
  );

  // Memoize content style
  const contentStyle = useMemo(
    () => ({
      ...(padding && { padding }), // Apply custom padding here
      ...(align && { textAlign: align }),
    }),
    [padding, align],
  );

  // Memoize icon style
  const iconStyle = useMemo(
    () => (iconSize ? { fontSize: iconSize } : undefined),
    [iconSize],
  );

  // Memoize title style
  const titleStyle = useMemo(
    () => ({
      ...(titleSize && { fontSize: titleSize }),
      ...(titleWeight && { fontWeight: titleWeight }),
      ...(titleColor && { color: titleColor }),
    }),
    [titleSize, titleWeight, titleColor],
  );

  // Memoize description style
  const descriptionStyle = useMemo(
    () => ({
      ...(descriptionSize && { fontSize: descriptionSize }),
      ...(descriptionWeight && { fontWeight: descriptionWeight }),
      ...(descriptionColor && { color: descriptionColor }),
      ...(textColor && !descriptionColor && { color: textColor }),
    }),
    [descriptionSize, descriptionWeight, descriptionColor, textColor],
  );

  return (
    <Card
      className={`item-card ${className}`}
      hoverable={hoverable}
      onClick={onClick}
      style={cardStyle}
      {...props}
    >
      <Card.Content
        style={contentStyle}
        data-element={dataElement}
        data-element-label={
          dataElementLabel ||
          (dataElement && formatElementIdForDisplay(dataElement))
        }
      >
        <Flex direction="column" gap={gap}>
          {icon && (
            <div
              className="item-card__icon"
              style={iconStyle}
              data-element={dataElement ? `${dataElement}.icon` : undefined}
              data-element-label={
                dataElement
                  ? formatElementIdForDisplay(`${dataElement}.icon`)
                  : undefined
              }
            >
              {icon}
            </div>
          )}
          {title && (
            <Card.Title
              className="item-card__title"
              style={titleStyle}
              data-element={dataElement ? `${dataElement}.title` : undefined}
              data-element-label={
                dataElement
                  ? formatElementIdForDisplay(`${dataElement}.title`)
                  : undefined
              }
            >
              {title}
            </Card.Title>
          )}
          {description && (
            <Card.Description
              className="item-card__description"
              style={descriptionStyle}
              data-element={dataElement ? `${dataElement}.content` : undefined}
              data-element-label={
                dataElement
                  ? formatElementIdForDisplay(`${dataElement}.content`)
                  : undefined
              }
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
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  dropShadow: PropTypes.string,
  titleSize: PropTypes.string,
  titleWeight: PropTypes.string,
  titleColor: PropTypes.string,
  descriptionSize: PropTypes.string,
  descriptionWeight: PropTypes.string,
  descriptionColor: PropTypes.string,
  textColor: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconSize: PropTypes.string,
  align: PropTypes.string,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  dataElement: PropTypes.string,
  dataElementLabel: PropTypes.string,
  children: PropTypes.node,
};
