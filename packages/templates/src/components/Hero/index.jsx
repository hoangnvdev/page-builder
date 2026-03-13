import "./index.scss";

import PropTypes from "prop-types";

import { Button, Container, Section, SubTitle, Title } from "@page-builder/ui";

export const Hero = ({
  title,
  subtitle,
  buttonText,
  backgroundColor,
  gradientStart,
  gradientEnd,
  titleColor,
  subtitleColor,
  buttonColor,
  onButtonClick,
}) => {
  // Build background style - use gradient if provided, otherwise use solid color
  const backgroundStyle =
    gradientStart && gradientEnd
      ? {
          background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        }
      : {};

  return (
    <Section
      dataElement="hero"
      backgroundColor={gradientStart ? undefined : backgroundColor}
      padding="100px 20px"
      style={{ textAlign: "center", ...backgroundStyle }}
    >
      <Container maxWidth="800px">
        <Title
          level={2}
          className="hero__title"
          style={{
            fontSize: "3.5rem",
            margin: "0 0 20px 0",
            fontWeight: "700",
            color: titleColor,
          }}
        >
          {title}
        </Title>
        <SubTitle
          className="hero__subtitle"
          style={{
            fontSize: "1.3rem",
            margin: "0 0 40px 0",
            color: subtitleColor,
          }}
        >
          {subtitle}
        </SubTitle>
        <Button
          size="large"
          onClick={onButtonClick}
          className="hero__button"
          style={{
            backgroundColor: buttonColor,
            padding: "16px 48px",
            fontSize: "1.1rem",
          }}
        >
          {buttonText}
        </Button>
      </Container>
    </Section>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  gradientStart: PropTypes.string,
  gradientEnd: PropTypes.string,
  titleColor: PropTypes.string,
  subtitleColor: PropTypes.string,
  buttonColor: PropTypes.string,
  onButtonClick: PropTypes.func,
};
