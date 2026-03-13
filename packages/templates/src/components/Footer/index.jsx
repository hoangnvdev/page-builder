import "./index.scss";

import PropTypes from "prop-types";

import { Section, SubTitle } from "@page-builder/ui";

export const Footer = ({ text, backgroundColor, textColor }) => {
  return (
    <Section
      dataElement="footer"
      backgroundColor={backgroundColor}
      padding="40px 20px"
      className="footer"
      style={{ color: textColor, textAlign: "center" }}
      as="footer"
    >
      <SubTitle className="footer__text" style={{ margin: 0 }}>
        {text}
      </SubTitle>
    </Section>
  );
};

Footer.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
