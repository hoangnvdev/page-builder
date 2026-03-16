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

export const SpeechBubbleTestimonials = ({
  // Section-level title
  title,
  titleSize,
  titleWeight,
  titleColor,

  // Section-level props
  quotes,
  backgroundColor,
  columns = 3,
  gap = "20px",
  padding = "80px 20px",
  align = "center",
  maxWidth,

  // Card defaults
  cardBackgroundColor = "#FFFFFF",
  cardPadding = "25px",
  cardAlign = "center",
  cardBorderRadius = "20px",
  cardDropShadow = "0 2px 4px rgba(0,0,0,0.1)",

  // Card avatar defaults
  cardAvatarSize = "large",
  cardAvatarBackgroundColor = "transparent",

  // Card title defaults (quote text)
  cardTitleSize = "1rem",
  cardTitleWeight = "400",
  cardTitleColor = "#2C1810",

  // Card content defaults (author)
  cardContentSize = "0.875rem",
  cardContentWeight = "700",
  cardContentColor = "#FF6B9D",

  dataElement,
  className = "",
  ...props
}) => {
  return (
    <Section
      className={`speech-bubble-testimonials ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      data-element={dataElement}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap} align={align}>
          {title && (
            <Title
              level={2}
              className="speech-bubble-testimonials__title"
              style={{
                fontSize: titleSize,
                fontWeight: titleWeight,
                color: titleColor,
                margin: 0,
                marginBottom: gap,
              }}
              data-element={`${dataElement}.title`}
            >
              {title}
            </Title>
          )}
          <Grid columns={columns} gap={gap}>
            {quotes.map((quote, index) => {
              // After unwrapping, avatar, title, content are simple strings/values
              // and styling properties are flattened (avatarSize, titleSize, etc.)
              const avatarText = quote.avatar;
              const titleText = quote.title || quote.text || quote.content;
              const contentText = quote.content || quote.author;

              // Get individual overrides or fallback to card defaults
              const itemBgColor = quote.backgroundColor || cardBackgroundColor;
              const itemPadding = quote.padding || cardPadding;
              const itemAlign = quote.align || cardAlign;
              const itemBorderRadius = quote.borderRadius || cardBorderRadius;
              const itemDropShadow = quote.dropShadow || cardDropShadow;

              const itemAvatarSize = quote.avatarSize || cardAvatarSize;
              const itemAvatarBgColor =
                quote.avatarBackgroundColor || cardAvatarBackgroundColor;

              const itemTitleSize = quote.titleSize || cardTitleSize;
              const itemTitleWeight = quote.titleWeight || cardTitleWeight;
              const itemTitleColor = quote.titleColor || cardTitleColor;

              const itemContentSize = quote.contentSize || cardContentSize;
              const itemContentWeight =
                quote.contentWeight || cardContentWeight;
              const itemContentColor = quote.contentColor || cardContentColor;

              return (
                <Grid.Item key={index}>
                  <Card
                    className="speech-bubble"
                    style={{
                      backgroundColor: itemBgColor,
                      padding: 0,
                      borderRadius: itemBorderRadius,
                      boxShadow:
                        itemDropShadow !== "none" ? itemDropShadow : "none",
                      overflow: "visible",
                    }}
                  >
                    <Card.Content
                      style={{
                        padding: itemPadding,
                        textAlign: itemAlign,
                      }}
                      data-element={`${dataElement}.quotes.${index}`}
                    >
                      <Flex direction="column" align={itemAlign} gap="12px">
                        {avatarText && (
                          <Avatar
                            className="speech-bubble__avatar"
                            size={itemAvatarSize}
                            style={{
                              backgroundColor: itemAvatarBgColor,
                            }}
                            data-element={`${dataElement}.quotes.${index}.avatar`}
                          >
                            {avatarText}
                          </Avatar>
                        )}
                        <Text
                          className="speech-bubble__title"
                          style={{
                            fontSize: itemTitleSize,
                            fontWeight: itemTitleWeight,
                            color: itemTitleColor,
                          }}
                          data-element={`${dataElement}.quotes.${index}.title`}
                        >
                          {titleText}
                        </Text>
                        {contentText && (
                          <Text
                            className="speech-bubble__content"
                            style={{
                              fontSize: itemContentSize,
                              fontWeight: itemContentWeight,
                              color: itemContentColor,
                            }}
                            data-element={`${dataElement}.quotes.${index}.content`}
                          >
                            — {contentText}
                          </Text>
                        )}
                      </Flex>
                    </Card.Content>
                  </Card>
                </Grid.Item>
              );
            })}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
};

SpeechBubbleTestimonials.propTypes = {
  title: PropTypes.string,
  titleSize: PropTypes.string,
  titleWeight: PropTypes.string,
  titleColor: PropTypes.string,
  quotes: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          text: PropTypes.string,
          size: PropTypes.string,
          backgroundColor: PropTypes.string,
        }),
      ]),
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          text: PropTypes.string,
          size: PropTypes.string,
          weight: PropTypes.string,
          color: PropTypes.string,
        }),
      ]),
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          text: PropTypes.string,
          size: PropTypes.string,
          weight: PropTypes.string,
          color: PropTypes.string,
        }),
      ]),
      backgroundColor: PropTypes.string,
      padding: PropTypes.string,
      align: PropTypes.string,
      borderRadius: PropTypes.string,
      dropShadow: PropTypes.string,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
  columns: PropTypes.number,
  gap: PropTypes.string,
  padding: PropTypes.string,
  align: PropTypes.string,
  maxWidth: PropTypes.string,
  cardBackgroundColor: PropTypes.string,
  cardPadding: PropTypes.string,
  cardAlign: PropTypes.string,
  cardBorderRadius: PropTypes.string,
  cardDropShadow: PropTypes.string,
  cardAvatarSize: PropTypes.string,
  cardAvatarBackgroundColor: PropTypes.string,
  cardTitleSize: PropTypes.string,
  cardTitleWeight: PropTypes.string,
  cardTitleColor: PropTypes.string,
  cardContentSize: PropTypes.string,
  cardContentWeight: PropTypes.string,
  cardContentColor: PropTypes.string,
  dataElement: PropTypes.string,
  className: PropTypes.string,
};
