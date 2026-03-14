import "./index.scss";

import PropTypes from "prop-types";

import {
  Card,
  Container,
  Grid,
  Section,
  SubTitle,
  Title,
} from "@page-builder/ui";

export const ComicPanels = ({ heading, panels, dataElement }) => {
  return (
    <Section className="comic-panels" dataElement={dataElement}>
      <Container>
        {heading && <Title>{heading}</Title>}
        <Grid columns={2}>
          {panels.map((panel, index) => (
            <Card
              key={index}
              className="comic-panel"
              style={{ backgroundColor: panel.backgroundColor }}
            >
              <div className="comic-panel__number">{panel.number}</div>
              <SubTitle className="comic-panel__title">{panel.title}</SubTitle>
              <p className="comic-panel__content">{panel.content}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

ComicPanels.propTypes = {
  heading: PropTypes.string,
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string,
    }),
  ).isRequired,
  dataElement: PropTypes.string,
};
