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
  headingSize,
  headingWeight,
  headingColor,
  commands,
  backgroundColor,
  promptColor,
  responseColor,
  windowBgColor,
  windowPadding,
  windowBorderRadius,
  windowDropShadow,
  windowBorderWidth,
  windowBorderColor,
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
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={20}>
          {heading && (
            <Title
              level={headingLevel}
              className="terminal__heading"
              style={{
                color: headingColor || promptColor,
                fontSize: headingSize,
                fontWeight: headingWeight,
              }}
              data-element={`${dataElement}.heading`}
            >
              {heading}
            </Title>
          )}
          <div
            className="terminal__window"
            style={{
              backgroundColor: windowBgColor || "#1e1e1e",
              padding: windowPadding,
              borderRadius: windowBorderRadius,
              boxShadow: windowDropShadow,
              borderWidth: windowBorderWidth,
              borderColor: windowBorderColor,
              borderStyle:
                windowBorderWidth && windowBorderWidth !== "0"
                  ? "solid"
                  : "none",
            }}
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
                    style={{
                      color: cmd.promptColor || promptColor,
                      fontSize: cmd.promptSize,
                      fontWeight: cmd.promptWeight,
                      fontFamily: "monospace",
                    }}
                    data-element={`${dataElement}.commands.${index}.prompt`}
                  >
                    {cmd.promptText}
                  </Text>
                  {cmd.responseText && (
                    <Text
                      className="terminal__response"
                      style={{
                        color: cmd.responseColor || responseColor,
                        fontSize: cmd.responseSize,
                        fontWeight: cmd.responseWeight,
                        fontFamily: "monospace",
                      }}
                      data-element={`${dataElement}.commands.${index}.response`}
                    >
                      {cmd.responseText}
                    </Text>
                  )}
                </Flex>
              ))}
              <Text
                className="terminal__cursor"
                style={{
                  color: promptColor || "#00ff9f",
                  fontFamily: "monospace",
                }}
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
      promptText: PropTypes.string.isRequired,
      promptColor: PropTypes.string,
      promptSize: PropTypes.string,
      promptWeight: PropTypes.string,
      responseText: PropTypes.string,
      responseColor: PropTypes.string,
      responseSize: PropTypes.string,
      responseWeight: PropTypes.string,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
  promptColor: PropTypes.string,
  responseColor: PropTypes.string,
  windowBgColor: PropTypes.string,
  windowPadding: PropTypes.string,
  windowBorderRadius: PropTypes.string,
  windowDropShadow: PropTypes.string,
  windowBorderWidth: PropTypes.string,
  windowBorderColor: PropTypes.string,
  dataElement: PropTypes.string,
};
