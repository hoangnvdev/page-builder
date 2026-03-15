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

export const CallToAction = ({
  // Title props
  title,
  titleSize,
  titleWeight,
  titleColor,

  // Subtitle props
  subtitle,
  subtitleSize,
  subtitleColor,

  // Button props
  buttonText,
  buttonUrl,
  buttonColor,
  buttonTextColor,
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
  return (
    <Section
      data-element={dataElement}
      backgroundColor={backgroundColor}
      padding={padding}
      className={`call-to-action ${className}`}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" align={align} gap={gap}>
          {title && (
            <Title
              level={2}
              className="call-to-action__title"
              style={{
                fontSize: titleSize,
                fontWeight: titleWeight,
                color: titleColor,
                margin: 0,
              }}
              data-element={`${dataElement}.title`}
            >
              {title}
            </Title>
          )}
          {subtitle && (
            <SubTitle
              className="call-to-action__subtitle"
              style={{
                fontSize: subtitleSize,
                color: subtitleColor,
                opacity: 0.9,
              }}
              data-element={`${dataElement}.subtitle`}
            >
              {subtitle}
            </SubTitle>
          )}
          {buttonText && (
            <a
              href={buttonUrl || "#"}
              target={
                buttonUrl &&
                (buttonUrl.startsWith("http://") ||
                  buttonUrl.startsWith("https://"))
                  ? "_blank"
                  : undefined
              }
              rel={
                buttonUrl &&
                (buttonUrl.startsWith("http://") ||
                  buttonUrl.startsWith("https://"))
                  ? "noopener noreferrer"
                  : undefined
              }
              style={{ textDecoration: "none" }}
            >
              <Button
                size={buttonSize}
                variant="primary"
                className="call-to-action__button"
                style={{
                  backgroundColor: buttonColor,
                  color: buttonTextColor,
                }}
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
  subtitleColor: PropTypes.string,
  buttonText: PropTypes.string,
  buttonUrl: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  buttonSize: PropTypes.string,
  backgroundColor: PropTypes.string,
  padding: PropTypes.string,
  align: PropTypes.string,
  maxWidth: PropTypes.string,
  gap: PropTypes.string,
  dataElement: PropTypes.string,
  className: PropTypes.string,
};
