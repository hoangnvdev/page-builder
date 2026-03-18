import './index.scss';

import PropTypes from 'prop-types';

import {
  Card,
  Container,
  Flex,
  Grid,
  Section,
  Text,
  Title,
} from '@page-builder/ui';

export const StatsCounter = ({
  // Section-level title
  title,
  titleSize,
  titleWeight,
  titleColor,

  // Section-level props
  items,
  stats,
  backgroundColor,
  columns = 4,
  gap = "30px",
  padding = "80px 20px",
  align = "center",
  maxWidth,

  // Card defaults
  cardBackgroundColor = "transparent",
  cardPadding = "20px",
  cardAlign = "center",
  cardBorderRadius = "0",
  cardBorderWidth = "0",
  cardBorderColor = "transparent",
  cardDropShadow = "none",

  // Card title defaults
  cardTitleSize = "2.5rem",
  cardTitleWeight = "700",
  cardTitleColor = "#FF6B9D",

  // Card content defaults
  cardContentSize = "1rem",
  cardContentWeight = "400",
  cardContentColor = "#2C1810",

  dataElement,
  className = "",
  ...props
}) => {
  const data = items || stats || [];

  return (
    <Section
      className={`stats-counter ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      data-element={dataElement}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap} align={align}>
          {title && (
            <Title
              level={2}
              className="stats-counter__title"
              style={{
                fontSize: titleSize,
                fontWeight: titleWeight,
                color: titleColor,
                margin: 0,
                marginBottom: gap,
              }}
              data-element={`${dataElement}.title`}
            >
              {title}
            </Title>
          )}
          <Grid columns={columns} gap={gap}>
            {data.map((stat, index) => {
              // After unwrapping, title and content are simple strings
              // and styling properties are flattened (titleSize, titleWeight, etc.)
              const statTitle = stat.title || stat.value;
              const statContent = stat.content || stat.label;

              // Get individual overrides or fallback to card defaults
              const itemBgColor = stat.backgroundColor || cardBackgroundColor;
              const itemPadding = stat.padding || cardPadding;
              const itemAlign = stat.align || cardAlign;
              const itemBorderRadius = stat.borderRadius || cardBorderRadius;
              const itemBorderWidth = stat.borderWidth || cardBorderWidth;
              const itemBorderColor = stat.borderColor || cardBorderColor;
              const itemDropShadow = stat.dropShadow || cardDropShadow;

              const itemTitleSize = stat.titleSize || cardTitleSize;
              const itemTitleWeight = stat.titleWeight || cardTitleWeight;
              const itemTitleColor = stat.titleColor || cardTitleColor;

              const itemContentSize = stat.contentSize || cardContentSize;
              const itemContentWeight = stat.contentWeight || cardContentWeight;
              const itemContentColor = stat.contentColor || cardContentColor;

              return (
                <Grid.Item key={index}>
                  <Card
                    className="stat-item"
                    style={{
                      backgroundColor: itemBgColor,
                      padding: 0,
                      borderRadius: itemBorderRadius,
                      ...(itemBorderWidth && itemBorderWidth !== "0"
                        ? {
                            borderWidth: itemBorderWidth,
                            borderStyle: "solid",
                            borderColor: itemBorderColor,
                          }
                        : {}),
                      boxShadow:
                        itemDropShadow !== "none" ? itemDropShadow : "none",
                      overflow: "visible",
                    }}
                  >
                    <Card.Content
                      style={{
                        padding: itemPadding,
                        textAlign: itemAlign,
                      }}
                      data-element={`${dataElement}.items.${index}`}
                    >
                      <Flex direction="column" gap="8px">
                        <Title
                          level={2}
                          className="stat-item__title"
                          style={{
                            fontSize: itemTitleSize,
                            fontWeight: itemTitleWeight,
                            color: itemTitleColor,
                            margin: 0,
                          }}
                          data-element={`${dataElement}.items.${index}.title`}
                        >
                          {statTitle}
                        </Title>
                        <Text
                          className="stat-item__content"
                          style={{
                            fontSize: itemContentSize,
                            fontWeight: itemContentWeight,
                            color: itemContentColor,
                          }}
                          data-element={`${dataElement}.items.${index}.content`}
                        >
                          {statContent}
                        </Text>
                      </Flex>
                    </Card.Content>
                  </Card>
                </Grid.Item>
              );
            })}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
};

StatsCounter.propTypes = {
  title: PropTypes.string,
  titleSize: PropTypes.string,
  titleWeight: PropTypes.string,
  titleColor: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
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
      backgroundColor: PropTypes.string,
      padding: PropTypes.string,
      align: PropTypes.string,
      borderRadius: PropTypes.string,
      dropShadow: PropTypes.string,
    }),
  ),
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      color: PropTypes.string,
      trend: PropTypes.string,
    }),
  ),
  backgroundColor: PropTypes.string,
  columns: PropTypes.number,
  gap: PropTypes.string,
  padding: PropTypes.string,
  align: PropTypes.string,
  maxWidth: PropTypes.string,
  cardBackgroundColor: PropTypes.string,
  cardPadding: PropTypes.string,
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
};
