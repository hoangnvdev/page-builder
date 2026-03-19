import "./index.scss";

import { useMemo } from "react";

import PropTypes from "prop-types";

import { Container, Flex, Image, Link, Title } from "@page-builder/ui";

import { formatElementIdForDisplay } from "../../utils/elementHelpers";

export const Header = ({
  companyName,
  logo,
  logoType,
  logoText,
  logoTextSize,
  logoTextWeight,
  logoTextColor,
  logoUrl,
  logoFile,
  logoWidth,
  logoHeight,
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

  // Memoize logo text style
  const logoTextStyle = useMemo(
    () => ({
      fontSize: logoTextSize || logoWidth || "40px",
      fontWeight: logoTextWeight || "600",
      color: logoTextColor || logoColor,
    }),
    [logoTextSize, logoTextWeight, logoTextColor, logoWidth, logoColor],
  );

  // Memoize company name style
  const companyNameStyle = useMemo(
    () => ({
      margin: 0,
      color: logoColor,
    }),
    [logoColor],
  );

  // Memoize header style
  const headerStyle = useMemo(
    () => ({
      backgroundColor,
      padding,
      boxShadow: shadow,
    }),
    [backgroundColor, padding, shadow],
  );

  // Render logo based on type
  const renderLogo = () => {
    // If legacy logo prop provided (for backward compatibility)
    if (logo) {
      return logo;
    }

    // New logo system with type selection
    // Handle uploaded image (base64)
    if (logoType === "upload" && logoFile) {
      return (
        <div
          className="header__logo-wrapper"
          data-element={`${dataElement}.logo`}
        >
          <Image
            src={logoFile}
            alt={companyName || "Logo"}
            width={logoWidth || "40px"}
            height={logoHeight || "40px"}
            fit="contain"
            className="header__logo-image"
          />
        </div>
      );
    }

    // Handle image URL
    if (logoType === "url" && logoUrl) {
      return (
        <div
          className="header__logo-wrapper"
          data-element={`${dataElement}.logo`}
        >
          <Image
            src={logoUrl}
            alt={companyName || "Logo"}
            width={logoWidth || "40px"}
            height={logoHeight || "40px"}
            fit="contain"
            className="header__logo-image"
          />
        </div>
      );
    }

    // Text/Emoji logo
    if (logoType === "text" && logoText) {
      return (
        <div
          className="header__logo-text"
          style={logoTextStyle}
          data-element={`${dataElement}.logo.text`}
        >
          {logoText}
        </div>
      );
    }

    // Legacy support: if logoType is "image" (old system)
    if (logoType === "image" && logoUrl) {
      return (
        <div
          className="header__logo-wrapper"
          data-element={`${dataElement}.logo`}
        >
          <Image
            src={logoUrl}
            alt={companyName || "Logo"}
            width={logoWidth || "40px"}
            height={logoHeight || "40px"}
            fit="contain"
            className="header__logo-image"
          />
        </div>
      );
    }

    // Fallback to company name
    return (
      <Title
        level={logoLevel}
        className="header__logo"
        style={companyNameStyle}
        data-element={`${dataElement}.companyName`}
      >
        {companyName}
      </Title>
    );
  };

  return (
    <Component
      data-element={dataElement}
      className={`header ${className}`}
      style={headerStyle}
    >
      <Container maxWidth={maxWidth}>
        <Flex justify="space-between" align="center">
          {renderLogo()}
          {links.length > 0 && (
            <Flex gap={linkGap} as="nav" className="header__nav">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color={link.color || linkColor}
                  style={{
                    fontSize: link.size,
                    fontWeight: link.weight,
                  }}
                  data-element={`${dataElement}.links.${index}`}
                  data-element-label={formatElementIdForDisplay(
                    `${dataElement}.links.${index}`,
                  )}
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
