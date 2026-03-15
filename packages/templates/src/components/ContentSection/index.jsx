import "./index.scss";

import PropTypes from "prop-types";

import { Container, Flex, Section, Text, Title } from "@page-builder/ui";

export const ContentSection = ({
  heading,
  headingSize,
  headingWeight,
  content,
  contentMaxWidth,
  contentAlign,
  backgroundColor,
  headingColor,
  textColor,
  maxWidth = "800px",
  padding = "60px 20px",
  headingLevel = 2,
  align = "flex-start",
  gap = 20,
  dataElement,
  className = "",
  children,
  ...props
}) => {
  return (
    <Section
      dataElement={dataElement}
      padding={padding}
      backgroundColor={backgroundColor}
      className={`content-section ${className}`}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap} align={align}>
          {heading && (
            <Title
              level={headingLevel}
              className="content-section__heading"
              style={{
                color: headingColor,
                fontSize: headingSize,
                fontWeight: headingWeight,
              }}
              data-element={`${dataElement}.heading`}
            >
              {heading}
            </Title>
          )}
          {content && (
            <Text
              className="content-section__content"
              style={{
                color: textColor,
                lineHeight: "1.8",
                maxWidth: contentMaxWidth,
                textAlign:
                  contentAlign === "flex-start"
                    ? "left"
                    : contentAlign === "flex-end"
                      ? "right"
                      : contentAlign,
              }}
              data-element={`${dataElement}.content`}
            >
              {content}
            </Text>
          )}
          {children}
        </Flex>
      </Container>
    </Section>
  );
};

ContentSection.propTypes = {
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string,
  headingWeight: PropTypes.string,
  content: PropTypes.string.isRequired,
  contentMaxWidth: PropTypes.string,
  contentAlign: PropTypes.string,
  backgroundColor: PropTypes.string,
  headingColor: PropTypes.string,
  textColor: PropTypes.string,
  maxWidth: PropTypes.string,
  dataElement: PropTypes.string,
};
