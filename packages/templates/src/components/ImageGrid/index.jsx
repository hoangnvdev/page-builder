import './index.scss';

import PropTypes from 'prop-types';

import {
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Section,
  Text,
  Title,
} from '@page-builder/ui';

import {
  getAspectRatioValue,
  getDropShadow,
} from '../../utils/componentHelpers';

export const ImageGrid = ({
  heading,
  headingSize,
  headingWeight,
  headingColor,
  images,
  backgroundColor,
  columns = 2,
  gap = 20,
  padding = "80px 20px",
  headingLevel = 2,
  imageHeight = 200,
  maxWidth,
  dataElement,
  className = "",
  renderImage,
  // Card defaults
  cardBackgroundColor,
  cardPadding,
  cardBorderRadius,
  cardDropShadow,
  // Image defaults
  imageUrl,
  imageAlt,
  imageFit,
  imageAspectRatio,
  // Caption defaults
  captionText,
  captionSize,
  captionWeight,
  captionColor,
  captionTextAlign,
  captionBackgroundColor,
  ...props
}) => {
  return (
    <Section
      className={`image-grid ${className}`}
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
              className="image-grid__heading"
              style={{
                fontSize: headingSize,
                fontWeight: headingWeight,
                color: headingColor,
              }}
              data-element={`${dataElement}.heading`}
            >
              {heading}
            </Title>
          )}
          <Grid columns={columns} gap={gap}>
            {images.map((item, index) => {
              // Extract card-level properties
              const itemBgColor = item.backgroundColor || cardBackgroundColor;
              const itemPadding = item.padding || cardPadding;
              const itemBorderRadius = item.borderRadius || cardBorderRadius;
              const itemDropShadow = item.dropShadow || cardDropShadow;

              // Extract nested image props (backward compatible)
              const imgData = item.image || item;
              const imgUrl = imgData.url || imgData.src || imageUrl;
              const imgAlt = imgData.alt || imageAlt || `Image ${index + 1}`;
              const imgFit = imgData.fit || imageFit || "cover";
              const imgAspectRatio = imgData.aspectRatio || imageAspectRatio;

              // Extract nested caption props (backward compatible)
              const capData = item.caption || {};
              const capText = capData.text || item.caption || captionText || "";
              const capSize = capData.size || captionSize;
              const capWeight = capData.weight || captionWeight;
              const capColor = capData.color || captionColor;
              const capAlign = capData.textAlign || captionTextAlign;
              const capBgColor =
                capData.backgroundColor || captionBackgroundColor;

              return (
                <Grid.Item key={index}>
                  {renderImage ? (
                    renderImage(item, index)
                  ) : (
                    <Card
                      className="image-grid__item"
                      style={{
                        backgroundColor: itemBgColor,
                        padding: itemPadding,
                        borderRadius: itemBorderRadius,
                        boxShadow: getDropShadow(itemDropShadow),
                        overflow: "visible",
                      }}
                      data-element={`${dataElement}.images.${index}`}
                    >
                      <Card.Image
                        height={imageHeight}
                        style={{
                          overflow: "hidden",
                          ...(imgAspectRatio && {
                            aspectRatio: getAspectRatioValue(imgAspectRatio),
                            height: "auto",
                          }),
                        }}
                      >
                        <Image
                          src={imgUrl}
                          alt={imgAlt}
                          fit={imgFit}
                          placeholder={item.placeholder || "▓"}
                          height="100%"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          data-element={`${dataElement}.images.${index}.image`}
                        />
                      </Card.Image>
                      {capText && (
                        <Card.Content
                          style={{
                            backgroundColor: capBgColor,
                          }}
                        >
                          <Text
                            className="image-grid__caption"
                            style={{
                              fontSize: capSize,
                              fontWeight: capWeight,
                              color: capColor,
                              textAlign: capAlign,
                            }}
                            data-element={`${dataElement}.images.${index}.caption`}
                          >
                            {capText}
                          </Text>
                        </Card.Content>
                      )}
                    </Card>
                  )}
                </Grid.Item>
              );
            })}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
};

ImageGrid.propTypes = {
  heading: PropTypes.string,
  headingSize: PropTypes.string,
  headingWeight: PropTypes.string,
  headingColor: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      // Card-level properties
      backgroundColor: PropTypes.string,
      padding: PropTypes.string,
      borderRadius: PropTypes.string,
      dropShadow: PropTypes.string,
      // Image properties
      image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          url: PropTypes.string,
          alt: PropTypes.string,
          fit: PropTypes.string,
          aspectRatio: PropTypes.string,
        }),
      ]),
      // Caption properties
      caption: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          text: PropTypes.string,
          size: PropTypes.string,
          weight: PropTypes.string,
          color: PropTypes.string,
          textAlign: PropTypes.string,
          backgroundColor: PropTypes.string,
        }),
      ]),
      placeholder: PropTypes.string,
      // Backward compatibility
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
  columns: PropTypes.number,
  gap: PropTypes.string,
  padding: PropTypes.string,
  headingLevel: PropTypes.number,
  imageHeight: PropTypes.number,
  maxWidth: PropTypes.string,
  dataElement: PropTypes.string,
  className: PropTypes.string,
  renderImage: PropTypes.func,
  // Card defaults
  cardBackgroundColor: PropTypes.string,
  cardPadding: PropTypes.string,
  cardBorderRadius: PropTypes.string,
  cardDropShadow: PropTypes.string,
  // Image defaults
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  imageFit: PropTypes.string,
  imageAspectRatio: PropTypes.string,
  // Caption defaults
  captionText: PropTypes.string,
  captionSize: PropTypes.string,
  captionWeight: PropTypes.string,
  captionColor: PropTypes.string,
  captionTextAlign: PropTypes.string,
  captionBackgroundColor: PropTypes.string,
};
