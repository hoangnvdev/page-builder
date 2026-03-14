import "./index.scss";

import PropTypes from "prop-types";

import { Section } from "@page-builder/ui";

export const Marquee = ({ text, backgroundColor, textColor }) => {
  return (
    <Section className="marquee" backgroundColor={backgroundColor}>
      <div className="marquee__track">
        <div className="marquee__content" style={{ color: textColor }}>
          {text} {text} {text}
        </div>
      </div>
    </Section>
  );
};

Marquee.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
