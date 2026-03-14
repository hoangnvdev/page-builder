import "./index.scss";

import PropTypes from "prop-types";

import { Container, Section, Title } from "@page-builder/ui";

export const Timeline = ({
  heading,
  milestones,
  phases,
  backgroundColor,
  lineColor,
  dotColor,
  dataElement,
}) => {
  const items = milestones || phases || [];

  return (
    <Section
      className="timeline"
      backgroundColor={backgroundColor}
      dataElement={dataElement}
    >
      <Container>
        {heading && <Title>{heading}</Title>}
        <div className="timeline__track" style={{ borderColor: lineColor }}>
          {items.map((item, index) => (
            <div key={index} className="timeline__item">
              <div
                className="timeline__dot"
                style={{ backgroundColor: dotColor }}
              ></div>
              <div className="timeline__content">
                <div className="timeline__year">
                  {item.year || item.quarter}
                </div>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__description">{item.description}</p>
                {item.status && (
                  <span
                    className={`timeline__status timeline__status--${item.status}`}
                  >
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
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
