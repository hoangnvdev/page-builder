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
  panels,
  columns = 2,
  gap = 20,
  backgroundColor,
  padding = "80px 20px",
  headingLevel = 2,
  maxWidth,
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
        <Flex direction="column" gap={gap}>
          {heading && (
            <Title level={headingLevel} className="comic-panels__heading">
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
                    style={{ backgroundColor: panel.backgroundColor }}
                  >
                    <Card.Content>
                      <Text
                        weight="bold"
                        size="large"
                        className="comic-panel__number"
                      >
                        {panel.number}
                      </Text>
                      <Card.Title className="comic-panel__title">
                        {panel.title}
                      </Card.Title>
                      <Card.Description className="comic-panel__content">
                        {panel.content}
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
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string,
    }),
  ).isRequired,
  dataElement: PropTypes.string,
};
