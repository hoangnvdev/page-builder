import "./index.scss";

import PropTypes from "prop-types";

import { Container, Section } from "@page-builder/ui";

export const QuoteBlock = ({
  quote,
  author,
  backgroundColor,
  quoteColor,
  dividerColor,
}) => {
  return (
    <Section className="quote-block" backgroundColor={backgroundColor}>
      <Container>
        <blockquote
          className="quote-block__quote"
          style={{ color: quoteColor }}
        >
          "{quote}"
        </blockquote>
        <div
          className="quote-block__divider"
          style={{ backgroundColor: dividerColor }}
        ></div>
        <p className="quote-block__author" style={{ color: quoteColor }}>
          {author}
        </p>
      </Container>
    </Section>
  );
};

QuoteBlock.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  quoteColor: PropTypes.string,
  dividerColor: PropTypes.string,
};
