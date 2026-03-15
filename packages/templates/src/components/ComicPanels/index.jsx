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

export const ComicPanels = ({
  heading,
  headingSize,
  headingWeight,
  headingColor,
  panels,
  columns = 2,
  gap = 20,
  backgroundColor,
  padding = "80px 20px",
  headingLevel = 2,
  maxWidth,
  align = "flex-start",
  cardBackgroundColor,
  cardPadding,
  cardAlign = "left",
  cardBorderRadius,
  cardDropShadow,
  cardTitleSize,
  cardTitleWeight,
  cardTitleColor,
  cardContentSize,
  cardContentWeight,
  cardContentColor,
  dataElement,
  className = "",
  renderPanel,
  ...props
}) => {
  return (
    <Section
      className={`comic-panels ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap} align={align}>
          {heading && (
            <Title
              level={headingLevel}
              className="comic-panels__heading"
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
          <Grid columns={columns} gap={gap}>
            {panels.map((panel, index) => (
              <Grid.Item key={index}>
                {renderPanel ? (
                  renderPanel(panel, index)
                ) : (
                  <Card
                    className="comic-panel"
                    style={{
                      backgroundColor:
                        panel.backgroundColor || cardBackgroundColor,
                      padding: panel.padding || cardPadding,
                      borderRadius: panel.borderRadius || cardBorderRadius,
                      boxShadow:
                        (panel.dropShadow || cardDropShadow) !== "none"
                          ? panel.dropShadow || cardDropShadow
                          : undefined,
                      textAlign: panel.align || cardAlign,
                    }}
                    data-element={`${dataElement}.panels.${index}`}
                  >
                    <Card.Content>
                      {panel.number && (
                        <Text
                          weight="bold"
                          size="large"
                          className="comic-panel__number"
                          data-element={`${dataElement}.panels.${index}.number`}
                        >
                          {panel.number}
                        </Text>
                      )}
                      <Card.Title
                        className="comic-panel__title"
                        style={{
                          fontSize: panel.title?.size || cardTitleSize,
                          fontWeight: panel.title?.weight || cardTitleWeight,
                          color: panel.title?.color || cardTitleColor,
                        }}
                        data-element={`${dataElement}.panels.${index}.title`}
                      >
                        {panel.title?.text || panel.title}
                      </Card.Title>
                      <Card.Description
                        className="comic-panel__content"
                        style={{
                          fontSize: panel.content?.size || cardContentSize,
                          fontWeight:
                            panel.content?.weight || cardContentWeight,
                          color: panel.content?.color || cardContentColor,
                        }}
                        data-element={`${dataElement}.panels.${index}.content`}
                      >
                        {panel.content?.text || panel.content}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                )}
              </Grid.Item>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
};

ComicPanels.propTypes = {
  heading: PropTypes.string,
  headingSize: PropTypes.string,
  headingWeight: PropTypes.string,
  headingColor: PropTypes.string,
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string,
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
  ).isRequired,
  columns: PropTypes.number,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string,
  padding: PropTypes.string,
  headingLevel: PropTypes.number,
  maxWidth: PropTypes.string,
  align: PropTypes.string,
  cardBackgroundColor: PropTypes.string,
  cardPadding: PropTypes.string,
  cardAlign: PropTypes.string,
  cardBorderRadius: PropTypes.string,
  cardDropShadow: PropTypes.string,
  cardTitleSize: PropTypes.string,
  cardTitleWeight: PropTypes.string,
  cardTitleColor: PropTypes.string,
  cardContentSize: PropTypes.string,
  cardContentWeight: PropTypes.string,
  cardContentColor: PropTypes.string,
  dataElement: PropTypes.string,
  className: PropTypes.string,
  renderPanel: PropTypes.func,
};
