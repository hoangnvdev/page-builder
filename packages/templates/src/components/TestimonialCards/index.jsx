import "./index.scss";

import PropTypes from "prop-types";

import { Card, Container, Grid, Section, Title } from "@page-builder/ui";

export const TestimonialCards = ({ heading, quotes, backgroundColor }) => {
  return (
    <Section className="testimonial-cards" backgroundColor={backgroundColor}>
      <Container>
        {heading && <Title>{heading}</Title>}
        <Grid columns={2}>
          {quotes.map((quote, index) => (
            <Card key={index} className="testimonial-card">
              <div className="testimonial-card__avatar">{quote.avatar}</div>
              <p className="testimonial-card__text">"{quote.text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__name">{quote.author}</div>
                {quote.title && (
                  <div className="testimonial-card__title">{quote.title}</div>
                )}
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

TestimonialCards.propTypes = {
  heading: PropTypes.string,
  quotes: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      title: PropTypes.string,
      avatar: PropTypes.string,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
};
