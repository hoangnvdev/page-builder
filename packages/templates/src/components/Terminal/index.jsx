import './index.scss';

import PropTypes from 'prop-types';

import {
  Container,
  Flex,
  Section,
  Text,
  Title,
} from '@page-builder/ui';

export const Terminal = ({
  heading,
  commands,
  backgroundColor,
  promptColor,
  responseColor,
  windowBgColor = "#1e1e1e",
  padding = "80px 20px",
  headingLevel = 2,
  showHeader = true,
  maxWidth = "900px",
  dataElement,
  className = "",
  children,
  ...props
}) => {
  return (
    <Section
      className={`terminal ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={20}>
          {heading && (
            <Title
              level={headingLevel}
              className="terminal__heading"
              style={{ color: promptColor }}
              data-element={`${dataElement}.heading`}
            >
              {heading}
            </Title>
          )}
          <div
            className="terminal__window"
            style={{ backgroundColor: windowBgColor }}
            data-element={`${dataElement}.window`}
          >
            {showHeader && (
              <Flex
                className="terminal__header"
                gap={8}
                style={{ padding: "12px" }}
              >
                <span className="terminal__dot terminal__dot--red"></span>
                <span className="terminal__dot terminal__dot--yellow"></span>
                <span className="terminal__dot terminal__dot--green"></span>
              </Flex>
            )}
            <div className="terminal__body">
              {commands.map((cmd, index) => (
                <Flex
                  key={index}
                  direction="column"
                  gap={4}
                  className="terminal__line"
                >
                  <Text
                    className="terminal__prompt"
                    style={{ color: promptColor, fontFamily: "monospace" }}
                    data-element={`${dataElement}.command-${index}.prompt`}
                  >
                    {cmd.prompt}
                  </Text>
                  {cmd.response && (
                    <Text
                      className="terminal__response"
                      style={{ color: responseColor, fontFamily: "monospace" }}
                      data-element={`${dataElement}.command-${index}.response`}
                    >
                      {cmd.response}
                    </Text>
                  )}
                </Flex>
              ))}
              <Text
                className="terminal__cursor"
                style={{ color: promptColor, fontFamily: "monospace" }}
              >
                $ <span className="terminal__blink">_</span>
              </Text>
            </div>
          </div>
          {children}
        </Flex>
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
