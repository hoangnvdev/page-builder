import './index.scss';

import PropTypes from 'prop-types';

import {
  Container,
  Flex,
  Section,
  Text,
  Title,
} from '@page-builder/ui';

export const ContentSection = ({
  heading,
  content,
  backgroundColor,
  headingColor,
  textColor,
  maxWidth = "800px",
  padding = "60px 20px",
  headingLevel = 2,
  align = "left",
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
              style={{ color: headingColor }}
            >
              {heading}
            </Title>
          )}
          {content && (
            <Text
              className="content-section__content"
              style={{ color: textColor, lineHeight: "1.8" }}
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
  content: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  headingColor: PropTypes.string,
  textColor: PropTypes.string,
  maxWidth: PropTypes.string,
  dataElement: PropTypes.string,
};
