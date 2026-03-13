import "./index.scss";

import PropTypes from "prop-types";

import { Container, Section, Title } from "@page-builder/ui";

import { ItemCard } from "../ItemCard";

export const ItemGrid = ({
  heading,
  items,
  backgroundColor,
  headingColor,
  itemTitleColor,
  itemTextColor,
  minItemWidth = "250px",
  gap = "40px",
  dataElement,
}) => {
  return (
    <Section
      dataElement={dataElement}
      padding="80px 20px"
      backgroundColor={backgroundColor}
      className="item-grid"
    >
      <Container>
        <Title
          level={3}
          className="item-grid__heading"
          style={{
            fontSize: "2.5rem",
            marginBottom: "50px",
            textAlign: "center",
            color: headingColor,
          }}
        >
          {heading}
        </Title>
        <div
          className="item-grid__container"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
            gap: gap,
          }}
        >
          {items.map((item, idx) => (
            <ItemCard
              key={item.id || idx}
              icon={item.icon}
              title={item.title}
              description={item.description}
              titleColor={itemTitleColor}
              textColor={itemTextColor}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

ItemGrid.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.node,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
  headingColor: PropTypes.string,
  itemTitleColor: PropTypes.string,
  itemTextColor: PropTypes.string,
  minItemWidth: PropTypes.string,
  gap: PropTypes.string,
  dataElement: PropTypes.string,
};
