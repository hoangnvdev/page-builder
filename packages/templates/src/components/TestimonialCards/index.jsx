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

export const TestimonialCards = ({
  heading,
  quotes,
  backgroundColor,
  columns = 2,
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
      className={`testimonial-cards ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap}>
          {heading && (
            <Title level={headingLevel} className="testimonial-cards__heading">
              {heading}
            </Title>
          )}
          <Grid columns={columns} gap={gap}>
            {quotes.map((quote, index) => (
              <Grid.Item key={index}>
                {renderQuote ? (
                  renderQuote(quote, index)
                ) : (
                  <Card className="testimonial-card">
                    <Card.Content>
                      <Flex direction="column" gap={16}>
                        {showAvatar && quote.avatar && (
                          <Avatar
                            className="testimonial-card__avatar"
                            size={avatarSize}
                            src={quote.avatarUrl}
                          >
                            {quote.avatar}
                          </Avatar>
                        )}
                        <Text className="testimonial-card__text">
                          "{quote.text}"
                        </Text>
                        <Flex direction="column" gap={4}>
                          <Text
                            className="testimonial-card__name"
                            weight="bold"
                            size="medium"
                          >
                            {quote.author}
                          </Text>
                          {quote.title && (
                            <Text
                              className="testimonial-card__title"
                              size="small"
                              color="#666"
                            >
                              {quote.title}
                            </Text>
                          )}
                        </Flex>
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
  dataElement: PropTypes.string,
};
