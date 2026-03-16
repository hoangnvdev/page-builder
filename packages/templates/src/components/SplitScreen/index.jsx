import "./index.scss";

import PropTypes from "prop-types";

import { Container, Flex, Image, Section, Text, Title } from "@page-builder/ui";

export const SplitScreen = ({
  imagePosition = "left",
  imageSrc,
  imageAlt = "",
  heading,
  content,
  backgroundColor,
  textColor,
  headingColor,
  padding = "0",
  headingLevel = 2,
  contentSize = "large",
  imageFit = "cover",
  ratio = "1:1",
  gap = 20,
  contentPadding = "40px",
  maxWidth,
  dataElement,
  className = "",
  children,
  ...props
}) => {
  const imageContent = (
    <Flex flex={1} className="split-screen__image">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fit={imageFit}
        height="100%"
        width="100%"
        className="split-screen__placeholder"
        data-element={`${dataElement}.image`}
      />
    </Flex>
  );

  const textContent = (
    <Flex
      flex={1}
      direction="column"
      justify="center"
      gap={gap}
      className="split-screen__content"
      style={{ color: textColor, padding: contentPadding }}
    >
      {heading && (
        <Title
          level={headingLevel}
          className="split-screen__heading"
          style={{ color: headingColor }}
          data-element={`${dataElement}.heading`}
        >
          {heading}
        </Title>
      )}
      {content && (
        <Text
          size={contentSize}
          className="split-screen__text"
          data-element={`${dataElement}.content`}
        >
          {content}
        </Text>
      )}
      {children}
    </Flex>
  );

  return (
    <Section
      className={`split-screen ${className}`}
      backgroundColor={backgroundColor}
      dataElement={dataElement}
      padding={padding}
    >
      <Container maxWidth={maxWidth}>
        <Flex className="split-screen__container">
          {imagePosition === "left" ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

SplitScreen.propTypes = {
  imagePosition: PropTypes.oneOf(["left", "right"]),
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  dataElement: PropTypes.string,
};
