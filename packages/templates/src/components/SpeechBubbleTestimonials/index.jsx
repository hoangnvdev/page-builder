import './index.scss';

import PropTypes from 'prop-types';

import {
  Avatar,
  Card,
  Container,
  Flex,
  Grid,
  Section,
  Text,
  Title,
} from '@page-builder/ui';

export const SpeechBubbleTestimonials = ({
  heading,
  quotes,
  backgroundColor,
  columns = 3,
  gap = 20,
  padding = "80px 20px",
  headingLevel = 2,
  avatarSize = "large",
  showAvatar = true,
  maxWidth,
  dataElement,
  className = "",
  renderQuote,
  ...props
}) => {
  return (
    <Section
      className={`speech-bubble-testimonials ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap}>
          {heading && (
            <Title
              level={headingLevel}
              className="speech-bubble-testimonials__heading"
            >
              {heading}
            </Title>
          )}
          <Grid columns={columns} gap={gap}>
            {quotes.map((quote, index) => (
              <Grid.Item key={index}>
                {renderQuote ? (
                  renderQuote(quote, index)
                ) : (
                  <Card className="speech-bubble">
                    <Card.Content>
                      <Flex direction="column" align="center" gap={12}>
                        {showAvatar && quote.avatar && (
                          <Avatar
                            className="speech-bubble__avatar"
                            size={avatarSize}
                            src={quote.avatarUrl}
                          >
                            {quote.avatar}
                          </Avatar>
                        )}
                        <Text className="speech-bubble__text" align="center">
                          {quote.text}
                        </Text>
                        <Text
                          className="speech-bubble__author"
                          size="small"
                          weight="medium"
                        >
                          — {quote.author}
                        </Text>
                      </Flex>
                    </Card.Content>
                  </Card>
                )}
              </Grid.Item>
            ))}
          </Grid>
        </Flex>
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
