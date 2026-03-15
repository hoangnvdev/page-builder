import './index.scss';

import PropTypes from 'prop-types';

import {
  Badge,
  Container,
  Flex,
  Section,
  Text,
  Title,
} from '@page-builder/ui';

export const Timeline = ({
  heading,
  milestones,
  phases,
  backgroundColor,
  lineColor = "#e0e0e0",
  dotColor = "#007bff",
  lineWidth = "2px",
  dotSize = "20px",
  itemGap = 40,
  padding = "80px 20px",
  headingLevel = 2,
  titleLevel = 3,
  maxWidth,
  dataElement,
  className = "",
  renderItem,
  ...props
}) => {
  const items = milestones || phases || [];

  return (
    <Section
      className={`timeline ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={itemGap}>
          {heading && (
            <Title
              level={headingLevel}
              className="timeline__heading"
              data-element={`${dataElement}.heading`}
            >
              {heading}
            </Title>
          )}
          <Flex
            direction="column"
            gap={itemGap}
            className="timeline__track"
            style={{
              borderLeft: `${lineWidth} solid ${lineColor}`,
              paddingLeft: "40px",
              position: "relative",
            }}
          >
            {items.map((item, index) => (
              <Flex
                key={index}
                gap={20}
                className="timeline__item"
                style={{ position: "relative" }}
              >
                <div
                  className="timeline__dot"
                  style={{
                    position: "absolute",
                    left: "-51px",
                    width: dotSize,
                    height: dotSize,
                    borderRadius: "50%",
                    backgroundColor: item.dotColor || dotColor,
                  }}
                  data-element={`${dataElement}.item-${index}.dot`}
                />
                {renderItem ? (
                  renderItem(item, index)
                ) : (
                  <Flex
                    direction="column"
                    gap={8}
                    className="timeline__content"
                  >
                    <Text
                      className="timeline__year"
                      weight="bold"
                      size="small"
                      color="#666"
                      data-element={`${dataElement}.item-${index}.date`}
                    >
                      {item.year || item.quarter || item.date}
                    </Text>
                    <Title
                      level={titleLevel}
                      className="timeline__title"
                      data-element={`${dataElement}.item-${index}.title`}
                    >
                      {item.title}
                    </Title>
                    <Text
                      className="timeline__description"
                      data-element={`${dataElement}.item-${index}.description`}
                    >
                      {item.description}
                    </Text>
                    {item.status && (
                      <Badge
                        className={`timeline__status timeline__status--${item.status}`}
                        variant="primary"
                        data-element={`${dataElement}.item-${index}.status`}
                      >
                        {item.status}
                      </Badge>
                    )}
                  </Flex>
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};

Timeline.propTypes = {
  heading: PropTypes.string,
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
  phases: PropTypes.arrayOf(
    PropTypes.shape({
      quarter: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string,
    }),
  ),
  backgroundColor: PropTypes.string,
  lineColor: PropTypes.string,
  dotColor: PropTypes.string,
  dataElement: PropTypes.string,
};
