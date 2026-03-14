import "./index.scss";

import PropTypes from "prop-types";

import { Container, Section, Title } from "@page-builder/ui";

export const TechSpecs = ({ heading, specs, backgroundColor }) => {
  return (
    <Section className="tech-specs" backgroundColor={backgroundColor}>
      <Container>
        {heading && <Title>{heading}</Title>}
        <div className="tech-specs__table">
          {specs.map((spec, index) => (
            <div key={index} className="tech-specs__row">
              <div className="tech-specs__category">{spec.category}</div>
              <div className="tech-specs__value">{spec.value}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

TechSpecs.propTypes = {
  heading: PropTypes.string,
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
};
