import './index.scss';

import PropTypes from 'prop-types';

import {
  Container,
  Flex,
  Grid,
  Section,
  Text,
  Title,
} from '@page-builder/ui';

export const StatsCounter = ({
  heading,
  items,
  stats,
  backgroundColor,
  columns = 4,
  gap = 30,
  padding = "80px 20px",
  headingLevel = 2,
  valueLevel = 2,
  align = "center",
  maxWidth,
  dataElement,
  className = "",
  renderStat,
  ...props
}) => {
  const data = items || stats || [];

  return (
    <Section
      className={`stats-counter ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap}>
          {heading && (
            <Title level={headingLevel} className="stats-counter__heading">
              {heading}
            </Title>
          )}
          <Grid columns={columns} gap={gap}>
            {data.map((stat, index) => (
              <Grid.Item key={index}>
                {renderStat ? (
                  renderStat(stat, index)
                ) : (
                  <Flex
                    direction="column"
                    align={align}
                    gap={8}
                    className="stat-item"
                  >
                    <Title
                      level={valueLevel}
                      className="stat-item__value"
                      style={{ color: stat.color, margin: 0 }}
                    >
                      {stat.value}
                    </Title>
                    <Text
                      className="stat-item__label"
                      align={align}
                      weight="medium"
                    >
                      {stat.label}
                    </Text>
                    {stat.trend && (
                      <Text className="stat-item__trend" size="small">
                        {stat.trend}
                      </Text>
                    )}
                  </Flex>
                )}
              </Grid.Item>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
};

StatsCounter.propTypes = {
  heading: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string,
      trend: PropTypes.string,
    }),
  ),
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string,
      trend: PropTypes.string,
    }),
  ),
  backgroundColor: PropTypes.string,
  dataElement: PropTypes.string,
};
