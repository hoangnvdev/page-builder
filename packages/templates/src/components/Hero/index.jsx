import './index.scss';

import PropTypes from 'prop-types';

import {
  Button,
  Container,
  Flex,
  Section,
  SubTitle,
  Title,
} from '@page-builder/ui';

export const Hero = ({
  title,
  subtitle,
  buttonText,
  backgroundColor,
  gradientStart,
  gradientEnd,
  gradientAngle = "135deg",
  titleColor,
  subtitleColor,
  buttonColor,
  buttonTextColor,
  onButtonClick,
  padding = "100px 20px",
  align = "center",
  titleLevel = 1,
  maxWidth = "800px",
  gap = 24,
  buttonSize = "large",
  buttonVariant = "primary",
  dataElement = "hero",
  className = "",
  ...props
}) => {
  // Build background style - use gradient if provided, otherwise use solid color
  const backgroundStyle =
    gradientStart && gradientEnd
      ? {
          background: `linear-gradient(${gradientAngle}, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        }
      : {};

  return (
    <Section
      dataElement={dataElement}
      backgroundColor={gradientStart ? undefined : backgroundColor}
      padding={padding}
      className={`hero ${className}`}
      style={backgroundStyle}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" align={align} gap={gap}>
          <Title
            level={titleLevel}
            className="hero__title"
            style={{ color: titleColor }}
          >
            {title}
          </Title>
          <SubTitle className="hero__subtitle" style={{ color: subtitleColor }}>
            {subtitle}
          </SubTitle>
          {buttonText && (
            <Button
              size={buttonSize}
              variant={buttonVariant}
              onClick={onButtonClick}
              className="hero__button"
              style={{
                backgroundColor: buttonColor,
                color: buttonTextColor,
              }}
            >
              {buttonText}
            </Button>
          )}
        </Flex>
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
