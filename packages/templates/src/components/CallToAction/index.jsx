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
  heading,
  subheading,
  buttonText,
  backgroundColor,
  textColor,
  buttonColor,
  buttonTextColor,
  onButtonClick,
  padding = "80px 20px",
  align = "center",
  headingLevel = 2,
  buttonSize = "large",
  buttonVariant = "primary",
  maxWidth = "800px",
  gap = 20,
  dataElement = "cta",
  className = "",
  ...props
}) => {
  return (
    <Section
      dataElement={dataElement}
      backgroundColor={backgroundColor}
      padding={padding}
      className={`call-to-action ${className}`}
      style={{ color: textColor }}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" align={align} gap={gap}>
          <Title
            level={headingLevel}
            className="call-to-action__heading"
            style={{ color: textColor }}
          >
            {heading}
          </Title>
          <SubTitle
            className="call-to-action__subheading"
            style={{ color: textColor, opacity: 0.9 }}
          >
            {subheading}
          </SubTitle>
          <Button
            onClick={onButtonClick}
            size={buttonSize}
            variant={buttonVariant}
            className="call-to-action__button"
            style={{
              backgroundColor: buttonColor,
              color: buttonTextColor,
            }}
          >
            {buttonText}
          </Button>
        </Flex>
      </Container>
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
