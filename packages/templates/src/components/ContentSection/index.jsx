import "./index.scss";

import PropTypes from "prop-types";

import { Container, Section, SubTitle, Title } from "@page-builder/ui";

export const ContentSection = ({
  heading,
  content,
  backgroundColor,
  headingColor,
  textColor,
  maxWidth = "800px",
  dataElement,
}) => {
  return (
    <Section
      dataElement={dataElement}
      padding="60px 20px"
      backgroundColor={backgroundColor}
      className="content-section"
    >
      <Container maxWidth={maxWidth}>
        <Title
          level={2}
          className="content-section__heading"
          style={{
            fontSize: "2.5rem",
            marginBottom: "20px",
            color: headingColor,
          }}
        >
          {heading}
        </Title>
        <SubTitle
          className="content-section__content"
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            color: textColor,
          }}
        >
          {content}
        </SubTitle>
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
