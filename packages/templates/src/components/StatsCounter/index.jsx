import "./index.scss";

import PropTypes from "prop-types";

import { Container, Grid, Section, Title } from "@page-builder/ui";

export const StatsCounter = ({
  heading,
  items,
  stats,
  backgroundColor,
  dataElement,
}) => {
  const data = items || stats || [];

  return (
    <Section
      className="stats-counter"
      backgroundColor={backgroundColor}
      dataElement={dataElement}
    >
      <Container>
        {heading && <Title>{heading}</Title>}
        <Grid columns={4}>
          {data.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-item__value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="stat-item__label">{stat.label}</div>
              {stat.trend && (
                <div className="stat-item__trend">{stat.trend}</div>
              )}
            </div>
          ))}
        </Grid>
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
