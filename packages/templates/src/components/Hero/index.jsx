import './index.scss';

import { useMemo } from 'react';

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
  titleSize,
  titleWeight,
  subtitleSize,
  subtitleWeight,
  buttonColor,
  buttonTextColor,
  buttonBorderRadius,
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
  console.log(`🦸 Hero component render (dataElement: ${dataElement})`);

  // Memoize style objects to prevent unnecessary re-renders of child components
  const titleStyle = useMemo(
    () => ({
      color: titleColor,
      ...(titleSize && { fontSize: titleSize }),
      ...(titleWeight && { fontWeight: titleWeight }),
    }),
    [titleColor, titleSize, titleWeight],
  );

  const subtitleStyle = useMemo(
    () => ({
      color: subtitleColor,
      ...(subtitleSize && { fontSize: subtitleSize }),
      ...(subtitleWeight && { fontWeight: subtitleWeight }),
    }),
    [subtitleColor, subtitleSize, subtitleWeight],
  );

  const buttonStyle = useMemo(
    () => ({
      backgroundColor: buttonColor,
      color: buttonTextColor,
      ...(buttonBorderRadius && { borderRadius: buttonBorderRadius }),
    }),
    [buttonColor, buttonTextColor, buttonBorderRadius],
  );

  // Build background style - use gradient if provided, otherwise use solid color
  const backgroundStyle = useMemo(
    () =>
      gradientStart && gradientEnd
        ? {
            background: `linear-gradient(${gradientAngle}, ${gradientStart} 0%, ${gradientEnd} 100%)`,
          }
        : {},
    [gradientStart, gradientEnd, gradientAngle],
  );

  return (
    <Section
      dataElement={dataElement}
      backgroundColor={gradientStart ? undefined : backgroundColor}
      padding={padding}
      className={`hero ${className}`}
      style={backgroundStyle}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" align={align} gap={gap}>
          <Title
            level={titleLevel}
            className="hero__title"
            style={titleStyle}
            data-element={`${dataElement}.title`}
          >
            {title}
          </Title>
          <SubTitle
            className="hero__subtitle"
            style={subtitleStyle}
            data-element={`${dataElement}.subtitle`}
          >
            {subtitle}
          </SubTitle>
          {buttonText && (
            <Button
              size={buttonSize}
              variant={buttonVariant}
              onClick={onButtonClick}
              className="hero__button"
              style={buttonStyle}
              data-element={`${dataElement}.button`}
            >
              {buttonText}
            </Button>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

Hero.displayName = "Hero";

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  gradientStart: PropTypes.string,
  gradientEnd: PropTypes.string,
  gradientAngle: PropTypes.string,
  titleColor: PropTypes.string,
  subtitleColor: PropTypes.string,
  titleSize: PropTypes.string,
  titleWeight: PropTypes.string,
  subtitleSize: PropTypes.string,
  subtitleWeight: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  buttonBorderRadius: PropTypes.string,
  buttonSize: PropTypes.string,
  buttonVariant: PropTypes.string,
  onButtonClick: PropTypes.func,
  padding: PropTypes.string,
  align: PropTypes.string,
  titleLevel: PropTypes.number,
  maxWidth: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dataElement: PropTypes.string,
  className: PropTypes.string,
};
