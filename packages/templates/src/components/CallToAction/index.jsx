import "./index.scss";

import PropTypes from "prop-types";

import { Button, Section, SubTitle, Title } from "@page-builder/ui";

export const CallToAction = ({
  heading,
  subheading,
  buttonText,
  backgroundColor,
  textColor,
  buttonColor,
  buttonTextColor,
  onButtonClick,
}) => {
  return (
    <Section
      dataElement="cta"
      backgroundColor={backgroundColor}
      padding="80px 20px"
      className="call-to-action"
      style={{ color: textColor, textAlign: "center" }}
    >
      <Title
        level={3}
        className="call-to-action__heading"
        style={{ fontSize: "2.5rem", margin: "0 0 20px 0" }}
      >
        {heading}
      </Title>
      <SubTitle
        className="call-to-action__subheading"
        style={{ fontSize: "1.2rem", margin: "0 0 30px 0", opacity: 0.9 }}
      >
        {subheading}
      </SubTitle>
      <Button
        onClick={onButtonClick}
        className="call-to-action__button"
        style={{
          backgroundColor: buttonColor,
          color: buttonTextColor,
          padding: "14px 40px",
          fontSize: "1.1rem",
        }}
      >
        {buttonText}
      </Button>
    </Section>
  );
};

CallToAction.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  onButtonClick: PropTypes.func,
};
