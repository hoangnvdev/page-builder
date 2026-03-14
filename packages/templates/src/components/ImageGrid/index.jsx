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

export const ImageGrid = ({
  heading,
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
            <Title level={headingLevel} className="image-grid__heading">
              {heading}
            </Title>
          )}
          <Grid columns={columns} gap={gap}>
            {images.map((image, index) => (
              <Grid.Item key={index}>
                {renderImage ? (
                  renderImage(image, index)
                ) : (
                  <Card className="image-grid__item">
                    <Card.Image height={imageHeight}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        placeholder={image.placeholder || "▓"}
                        height="100%"
                      />
                    </Card.Image>
                    {image.caption && (
                      <Card.Content>
                        <Text className="image-grid__caption">
                          {image.caption}
                        </Text>
                      </Card.Content>
                    )}
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

ImageGrid.propTypes = {
  heading: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      placeholder: PropTypes.string,
      caption: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
  columns: PropTypes.number,
  dataElement: PropTypes.string,
};
