import "./index.scss";

import PropTypes from "prop-types";

import {
  Avatar,
  Card,
  Container,
  Flex,
  Grid,
  Section,
  Text,
  Title,
} from "@page-builder/ui";

import { formatElementIdForDisplay } from "../../utils/elementHelpers";

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
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap}>
          {heading && (
            <Title
              level={headingLevel}
              className="testimonial-cards__heading"
              data-element={`${dataElement}.heading`}
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
                  <Card
                    className="testimonial-card"
                    data-element={`${dataElement}.card-${index}`}
                    data-element-label={formatElementIdForDisplay(
                      `${dataElement}.card-${index}`,
                    )}
                  >
                    <Card.Content>
                      <Flex direction="column" gap={16}>
                        {showAvatar && quote.avatar && (
                          <Avatar
                            className="testimonial-card__avatar"
                            size={avatarSize}
                            src={quote.avatarUrl}
                            data-element={`${dataElement}.card-${index}.avatar`}
                            data-element-label={formatElementIdForDisplay(
                              `${dataElement}.card-${index}.avatar`,
                            )}
                          >
                            {quote.avatar}
                          </Avatar>
                        )}
                        <Text
                          className="testimonial-card__text"
                          data-element={`${dataElement}.card-${index}.text`}
                          data-element-label={formatElementIdForDisplay(
                            `${dataElement}.card-${index}.text`,
                          )}
                        >
                          "{quote.text}"
                        </Text>
                        <Flex direction="column" gap={4}>
                          <Text
                            className="testimonial-card__name"
                            weight="bold"
                            size="medium"
                            data-element={`${dataElement}.card-${index}.author`}
                            data-element-label={formatElementIdForDisplay(
                              `${dataElement}.card-${index}.author`,
                            )}
                          >
                            {quote.author}
                          </Text>
                          {quote.title && (
                            <Text
                              className="testimonial-card__title"
                              size="small"
                              color="#666"
                              data-element={`${dataElement}.card-${index}.title`}
                              data-element-label={formatElementIdForDisplay(
                                `${dataElement}.card-${index}.title`,
                              )}
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
