import './index.scss';

import PropTypes from 'prop-types';

import {
  Container,
  Flex,
  Section,
  Text,
} from '@page-builder/ui';

export const Footer = ({
  text,
  backgroundColor,
  textColor,
  padding = "40px 20px",
  align = "center",
  maxWidth,
  dataElement = "footer",
  className = "",
  children,
  links,
  ...props
}) => {
  return (
    <Section
      dataElement={dataElement}
      backgroundColor={backgroundColor}
      padding={padding}
      className={`footer ${className}`}
      style={{ color: textColor }}
      as="footer"
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" align={align} gap={16}>
          {text && (
            <Text className="footer__text" align={align}>
              {text}
            </Text>
          )}
          {links && links.length > 0 && (
            <Flex gap={20} className="footer__links" wrap="wrap">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="footer__link"
                  style={{ color: textColor }}
                >
                  {link.text}
                </a>
              ))}
            </Flex>
          )}
          {children}
        </Flex>
      </Container>
    </Section>
  );
};

Footer.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
