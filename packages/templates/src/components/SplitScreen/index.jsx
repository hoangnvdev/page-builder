import "./index.scss";

import PropTypes from "prop-types";

import { Section } from "@page-builder/ui";

export const SplitScreen = ({
  imagePosition = "left",
  imagePlaceholder,
  heading,
  content,
  backgroundColor,
  textColor,
}) => {
  return (
    <Section className="split-screen" backgroundColor={backgroundColor}>
      <div
        className={`split-screen__container split-screen__container--${imagePosition}`}
      >
        <div className="split-screen__image">
          <div className="split-screen__placeholder">{imagePlaceholder}</div>
        </div>
        <div className="split-screen__content" style={{ color: textColor }}>
          <h2 className="split-screen__heading">{heading}</h2>
          <p className="split-screen__text">{content}</p>
        </div>
      </div>
    </Section>
  );
};

SplitScreen.propTypes = {
  imagePosition: PropTypes.oneOf(["left", "right"]),
  imagePlaceholder: PropTypes.string,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
