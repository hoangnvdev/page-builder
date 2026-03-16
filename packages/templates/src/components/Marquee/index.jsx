import "./index.scss";

import PropTypes from "prop-types";

import { Section, Text } from "@page-builder/ui";

export const Marquee = ({
  text,
  backgroundColor,
  textColor,
  padding = "20px",
  textSize = "large",
  textWeight = "bold",
  speed = "20s",
  repeat = 3,
  dataElement,
  className = "",
  ...props
}) => {
  const repeatedText = Array(repeat).fill(text).join(" ");

  return (
    <Section
      className={`marquee ${className}`}
      backgroundColor={backgroundColor}
      dataElement={dataElement}
      padding={padding}
    >
      <div className="marquee__track">
        <Text
          className="marquee__content"
          style={{
            color: textColor,
            animationDuration: speed,
          }}
          weight={textWeight}
          size={textSize}
          data-element={`${dataElement}.text`}
        >
          {repeatedText}
        </Text>
      </div>
    </Section>
  );
};

Marquee.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  dataElement: PropTypes.string,
};
