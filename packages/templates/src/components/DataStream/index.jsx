import "./index.scss";

import PropTypes from "prop-types";

import { Container, Flex, Section, Text, Title } from "@page-builder/ui";

export const DataStream = ({
  heading,
  lines,
  backgroundColor,
  textColor,
  padding = "80px 20px",
  headingLevel = 2,
  gap = 8,
  animationDelay = 0.2,
  fontFamily = "monospace",
  maxWidth,
  dataElement,
  className = "",
  renderLine,
  ...props
}) => {
  return (
    <Section
      className={`data-stream ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap * 2}>
          {heading && (
            <Title
              level={headingLevel}
              className="data-stream__heading"
              data-element={`${dataElement}.heading`}
            >
              {heading}
            </Title>
          )}
          <Flex direction="column" gap={gap} className="data-stream__container">
            {lines.map((line, index) =>
              renderLine ? (
                renderLine(line, index)
              ) : (
                <Text
                  key={index}
                  className="data-stream__line"
                  style={{
                    color: textColor,
                    animationDelay: `${index * animationDelay}s`,
                    fontFamily,
                  }}
                  data-element={`${dataElement}.line-${index}`}
                >
                  {line}
                </Text>
              ),
            )}
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};

DataStream.propTypes = {
  heading: PropTypes.string,
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  dataElement: PropTypes.string,
};
