import "./index.scss";

import PropTypes from "prop-types";

import { Container, Section, Title } from "@page-builder/ui";

export const Terminal = ({
  heading,
  commands,
  backgroundColor,
  promptColor,
  responseColor,
  dataElement,
}) => {
  return (
    <Section
      className="terminal"
      backgroundColor={backgroundColor}
      dataElement={dataElement}
    >
      <Container>
        {heading && <Title style={{ color: promptColor }}>{heading}</Title>}
        <div className="terminal__window">
          <div className="terminal__header">
            <span className="terminal__dot terminal__dot--red"></span>
            <span className="terminal__dot terminal__dot--yellow"></span>
            <span className="terminal__dot terminal__dot--green"></span>
          </div>
          <div className="terminal__body">
            {commands.map((cmd, index) => (
              <div key={index} className="terminal__line">
                <p className="terminal__prompt" style={{ color: promptColor }}>
                  {cmd.prompt}
                </p>
                <p
                  className="terminal__response"
                  style={{ color: responseColor }}
                >
                  {cmd.response}
                </p>
              </div>
            ))}
            <p className="terminal__cursor" style={{ color: promptColor }}>
              $ <span className="terminal__blink">_</span>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
};

Terminal.propTypes = {
  heading: PropTypes.string,
  commands: PropTypes.arrayOf(
    PropTypes.shape({
      prompt: PropTypes.string.isRequired,
      response: PropTypes.string.isRequired,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
  promptColor: PropTypes.string,
  responseColor: PropTypes.string,
  dataElement: PropTypes.string,
};
