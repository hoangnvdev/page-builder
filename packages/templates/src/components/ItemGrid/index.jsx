import "./index.scss";

import PropTypes from "prop-types";

import { Container, Flex, Grid, Section, Title } from "@page-builder/ui";

import { ItemCard } from "../ItemCard";

export const ItemGrid = ({
  heading,
  headingSize,
  headingWeight,
  headingColor,
  items,
  backgroundColor,
  columns = 3,
  gap = 40,
  padding = "80px 20px",
  headingLevel = 2,
  align = "flex-start",
  maxWidth,
  cardBackgroundColor,
  cardPadding,
  cardGap,
  cardAlign,
  cardBorderRadius,
  cardBorderWidth,
  cardBorderColor,
  cardDropShadow,
  cardTitleSize,
  cardTitleWeight,
  cardTitleColor,
  cardContentSize,
  cardContentWeight,
  cardContentColor,
  dataElement,
  className = "",
  renderItem,
  ...props
}) => {
  return (
    <Section
      dataElement={dataElement}
      padding={padding}
      backgroundColor={backgroundColor}
      className={`item-grid ${className}`}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap} align={align}>
          {heading && (
            <Title
              level={headingLevel}
              className="item-grid__heading"
              style={{
                ...(headingSize && { fontSize: headingSize }),
                ...(headingWeight && { fontWeight: headingWeight }),
                ...(headingColor && { color: headingColor }),
              }}
              data-element={`${dataElement}.heading`}
            >
              {heading}
            </Title>
          )}
          <Grid columns={columns} gap={gap} className="item-grid__container">
            {items.map((item, idx) => (
              <Grid.Item key={item.id || idx}>
                {renderItem ? (
                  renderItem(item, idx)
                ) : (
                  <ItemCard
                    icon={item.icon}
                    title={item.title}
                    description={item.content || item.description}
                    backgroundColor={
                      item.backgroundColor || cardBackgroundColor
                    }
                    padding={item.padding || cardPadding}
                    gap={item.gap || cardGap}
                    align={item.align || cardAlign}
                    borderRadius={item.borderRadius || cardBorderRadius}
                    borderWidth={item.borderWidth || cardBorderWidth}
                    borderColor={item.borderColor || cardBorderColor}
                    dropShadow={item.dropShadow || cardDropShadow}
                    titleSize={item.titleSize || cardTitleSize}
                    titleWeight={item.titleWeight || cardTitleWeight}
                    titleColor={item.titleColor || cardTitleColor}
                    descriptionSize={item.contentSize || cardContentSize}
                    descriptionWeight={item.contentWeight || cardContentWeight}
                    descriptionColor={item.contentColor || cardContentColor}
                    dataElement={`${dataElement}.items.${idx}`}
                  />
                )}
              </Grid.Item>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
};

ItemGrid.propTypes = {
  heading: PropTypes.string,
  headingSize: PropTypes.string,
  headingWeight: PropTypes.string,
  headingColor: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.node,
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          text: PropTypes.string,
          size: PropTypes.string,
          weight: PropTypes.string,
          color: PropTypes.string,
        }),
      ]),
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          text: PropTypes.string,
          size: PropTypes.string,
          weight: PropTypes.string,
          color: PropTypes.string,
        }),
      ]),
      description: PropTypes.string,
      backgroundColor: PropTypes.string,
      padding: PropTypes.string,
      align: PropTypes.string,
      borderRadius: PropTypes.string,
      dropShadow: PropTypes.string,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
  columns: PropTypes.number,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.string,
  headingLevel: PropTypes.number,
  align: PropTypes.string,
  maxWidth: PropTypes.string,
  cardBackgroundColor: PropTypes.string,
  cardPadding: PropTypes.string,
  cardGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cardAlign: PropTypes.string,
  cardBorderRadius: PropTypes.string,
  cardBorderWidth: PropTypes.string,
  cardBorderColor: PropTypes.string,
  cardDropShadow: PropTypes.string,
  cardTitleSize: PropTypes.string,
  cardTitleWeight: PropTypes.string,
  cardTitleColor: PropTypes.string,
  cardContentSize: PropTypes.string,
  cardContentWeight: PropTypes.string,
  cardContentColor: PropTypes.string,
  dataElement: PropTypes.string,
  className: PropTypes.string,
  renderItem: PropTypes.func,
};
