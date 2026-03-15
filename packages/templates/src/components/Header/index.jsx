import './index.scss';

import PropTypes from 'prop-types';

import {
  Container,
  Flex,
  Link,
  Title,
} from '@page-builder/ui';

export const Header = ({
  companyName,
  logo,
  backgroundColor,
  logoColor,
  linkColor,
  links = [],
  padding = "20px 40px",
  shadow = "0 2px 4px rgba(0,0,0,0.1)",
  logoLevel = 1,
  linkGap = 20,
  maxWidth,
  dataElement = "header",
  className = "",
  as = "header",
  ...props
}) => {
  const Component = as;

  return (
    <Component
      data-element={dataElement}
      className={`header ${className}`}
      style={{
        backgroundColor,
        padding,
        boxShadow: shadow,
      }}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex justify="space-between" align="center">
          {logo || (
            <Title
              level={logoLevel}
              className="header__logo"
              style={{ margin: 0, color: logoColor }}
              data-element={`${dataElement}.companyName`}
            >
              {companyName}
            </Title>
          )}
          {links.length > 0 && (
            <Flex gap={linkGap} as="nav" className="header__nav">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color={linkColor}
                  data-element={`${dataElement}.link-${index}`}
                >
                  {link.text}
                </Link>
              ))}
            </Flex>
          )}
        </Flex>
      </Container>
    </Component>
  );
};

Header.propTypes = {
  companyName: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  logoColor: PropTypes.string,
  linkColor: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string,
    }),
  ),
};
