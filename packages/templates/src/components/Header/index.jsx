import "./index.scss";

import PropTypes from "prop-types";

import { Container, Flex, Link, Title } from "@page-builder/ui";

export const Header = ({
  companyName,
  backgroundColor,
  logoColor,
  linkColor,
  links = [],
}) => {
  return (
    <header
      data-element="header"
      className="header"
      style={{
        backgroundColor,
        padding: "20px 40px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container>
        <Flex justify="space-between" align="center">
          <Title
            level={1}
            className="header__logo"
            style={{ margin: 0, fontSize: "1.5rem", color: logoColor }}
          >
            {companyName}
          </Title>
          <Flex gap={20} as="nav" className="header__nav">
            {links.map((link, index) => (
              <Link key={index} href={link.href} color={linkColor}>
                {link.text}
              </Link>
            ))}
          </Flex>
        </Flex>
      </Container>
    </header>
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
