import "./index.scss";

import { useMemo } from "react";

import PropTypes from "prop-types";

import {
  Button,
  Container,
  Flex,
  Section,
  SubTitle,
  Title,
} from "@page-builder/ui";

export const CallToAction = ({
  // Title props
  title,
  titleSize,
  titleWeight,
  titleColor,

  // Subtitle props
  subtitle,
  subtitleSize,
  subtitleWeight,
  subtitleColor,

  // Button props
  buttonText,
  buttonUrl,
  buttonColor,
  buttonTextColor,
  buttonBorderRadius,
  buttonSize = "large",

  // Section props
  backgroundColor,
  padding = "80px 20px",
  align = "center",
  maxWidth = "800px",
  gap = "20px",

  dataElement = "cta",
  className = "",
  ...props
}) => {
  // Determine if URL is external
  const isExternalUrl =
    buttonUrl &&
    (buttonUrl.startsWith("http://") || buttonUrl.startsWith("https://"));

  // Memoize title style
  const titleStyle = useMemo(
    () => ({
      fontSize: titleSize,
      fontWeight: titleWeight,
      color: titleColor,
      margin: 0,
    }),
    [titleSize, titleWeight, titleColor],
  );

  // Memoize subtitle style
  const subtitleStyle = useMemo(
    () => ({
      fontSize: subtitleSize,
      fontWeight: subtitleWeight,
      color: subtitleColor,
      opacity: 0.9,
    }),
    [subtitleSize, subtitleWeight, subtitleColor],
  );

  // Memoize button style
  const buttonStyle = useMemo(
    () => ({
      backgroundColor: buttonColor,
      color: buttonTextColor,
      ...(buttonBorderRadius && {
        borderRadius: buttonBorderRadius,
      }),
    }),
    [buttonColor, buttonTextColor, buttonBorderRadius],
  );

  return (
    <Section
      data-element={dataElement}
      backgroundColor={backgroundColor}
      padding={padding}
      className={`call-to-action ${className}`}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" align={align} gap={gap}>
          {title && (
            <Title
              level={2}
              className="call-to-action__title"
              style={titleStyle}
              data-element={`${dataElement}.title`}
            >
              {title}
            </Title>
          )}
          {subtitle && (
            <SubTitle
              className="call-to-action__subtitle"
              style={subtitleStyle}
              data-element={`${dataElement}.subtitle`}
            >
              {subtitle}
            </SubTitle>
          )}
          {buttonText && (
            <a
              href={buttonUrl || "#"}
              target={isExternalUrl ? "_blank" : undefined}
              rel={isExternalUrl ? "noopener noreferrer" : undefined}
              style={{ textDecoration: "none" }}
            >
              <Button
                size={buttonSize}
                variant="primary"
                className="call-to-action__button"
                style={buttonStyle}
                data-element={`${dataElement}.button`}
              >
                {buttonText}
              </Button>
            </a>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

CallToAction.propTypes = {
  title: PropTypes.string,
  titleSize: PropTypes.string,
  titleWeight: PropTypes.string,
  titleColor: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleSize: PropTypes.string,
  subtitleWeight: PropTypes.string,
  subtitleColor: PropTypes.string,
  buttonText: PropTypes.string,
  buttonUrl: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  buttonBorderRadius: PropTypes.string,
  buttonSize: PropTypes.string,
  backgroundColor: PropTypes.string,
  padding: PropTypes.string,
  align: PropTypes.string,
  maxWidth: PropTypes.string,
  gap: PropTypes.string,
  dataElement: PropTypes.string,
  className: PropTypes.string,
};
