import "./index.scss";

import PropTypes from "prop-types";

import { Container, Grid, Section, Title } from "@page-builder/ui";

export const ImageGrid = ({
  heading,
  images,
  backgroundColor,
  columns,
  dataElement,
}) => {
  return (
    <Section
      className="image-grid"
      backgroundColor={backgroundColor}
      dataElement={dataElement}
    >
      <Container>
        {heading && <Title>{heading}</Title>}
        <Grid columns={columns || 2}>
          {images.map((image, index) => (
            <div key={index} className="image-grid__item">
              <div className="image-grid__placeholder">
                {image.placeholder || "▓"}
              </div>
              {image.caption && (
                <p className="image-grid__caption">{image.caption}</p>
              )}
            </div>
          ))}
        </Grid>
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
