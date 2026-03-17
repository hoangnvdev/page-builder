import './index.scss';

import { useMemo } from 'react';

import PropTypes from 'prop-types';

import {
  Container,
  Flex,
  Section,
  Text,
} from '@page-builder/ui';

export const Footer = ({
  // Text props
  text,
  textSize,
  textWeight,
  textDecoration,
  textColor,

  // Section props
  backgroundColor,
  padding = "40px 20px",
  textAlign = "center",
  flexAlign = "center",
  maxWidth,

  dataElement = "footer",
  className = "",
  children,
  links,
  ...props
}) => {
  // Handle italic as fontStyle instead of textDecoration
  const isItalic = textDecoration === "italic";
  const actualDecoration = isItalic ? "none" : textDecoration;
  const fontStyle = isItalic ? "italic" : "normal";

  // Memoize text style
  const textStyle = useMemo(
    () => ({
      fontSize: textSize,
      fontWeight: textWeight,
      textDecoration: actualDecoration,
      fontStyle: fontStyle,
      color: textColor,
    }),
    [textSize, textWeight, actualDecoration, fontStyle, textColor],
  );

  // Memoize link style
  const linkStyle = useMemo(() => ({ color: textColor }), [textColor]);

  return (
    <Section
      data-element={dataElement}
      backgroundColor={backgroundColor}
      padding={padding}
      className={`footer ${className}`}
      as="footer"
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" align={flexAlign} gap="16px">
          {text && (
            <Text
              className="footer__text"
              align={textAlign}
              style={textStyle}
              data-element={`${dataElement}.text`}
            >
              {text}
            </Text>
          )}
          {links && links.length > 0 && (
            <Flex gap="20px" className="footer__links" wrap="wrap">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="footer__link"
                  style={linkStyle}
                  data-element={`${dataElement}.link-${index}`}
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
  text: PropTypes.string,
  textSize: PropTypes.string,
  textWeight: PropTypes.string,
  textDecoration: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  padding: PropTypes.string,
  textAlign: PropTypes.string,
  flexAlign: PropTypes.string,
  maxWidth: PropTypes.string,
  dataElement: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};
