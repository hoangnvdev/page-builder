import "./index.scss";

import PropTypes from "prop-types";

import { Container, Section, Title } from "@page-builder/ui";

export const DataStream = ({ heading, lines, backgroundColor, textColor }) => {
  return (
    <Section className="data-stream" backgroundColor={backgroundColor}>
      <Container>
        {heading && <Title>{heading}</Title>}
        <div className="data-stream__container">
          {lines.map((line, index) => (
            <div
              key={index}
              className="data-stream__line"
              style={{
                color: textColor,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

DataStream.propTypes = {
  heading: PropTypes.string,
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
