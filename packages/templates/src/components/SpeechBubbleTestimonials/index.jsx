import "./index.scss";

import PropTypes from "prop-types";

import { Container, Grid, Section, Title } from "@page-builder/ui";

export const SpeechBubbleTestimonials = ({ heading, quotes, dataElement }) => {
  return (
    <Section className="speech-bubble-testimonials" dataElement={dataElement}>
      <Container>
        {heading && <Title>{heading}</Title>}
        <Grid columns={3}>
          {quotes.map((quote, index) => (
            <div key={index} className="speech-bubble">
              <div className="speech-bubble__avatar">{quote.avatar}</div>
              <div className="speech-bubble__content">
                <p className="speech-bubble__text">{quote.text}</p>
              </div>
              <div className="speech-bubble__author">— {quote.author}</div>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

SpeechBubbleTestimonials.propTypes = {
  heading: PropTypes.string,
  quotes: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  ).isRequired,
  dataElement: PropTypes.string,
};
