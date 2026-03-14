import './index.scss';

import PropTypes from 'prop-types';

import {
  Container,
  Flex,
  Grid,
  Section,
  Title,
} from '@page-builder/ui';

import { ItemCard } from '../ItemCard';

export const ItemGrid = ({
  heading,
  items,
  backgroundColor,
  headingColor,
  itemTitleColor,
  itemTextColor,
  columns = 3,
  gap = 40,
  padding = "80px 20px",
  headingLevel = 2,
  headingAlign = "center",
  maxWidth,
  dataElement,
  className = "",
  renderItem,
  ...props
}) => {
  return (
    <Section
      dataElement={dataElement}
      padding={padding}
      backgroundColor={backgroundColor}
      className={`item-grid ${className}`}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={gap}>
          {heading && (
            <Title
              level={headingLevel}
              className="item-grid__heading"
              style={{
                textAlign: headingAlign,
                color: headingColor,
              }}
            >
              {heading}
            </Title>
          )}
          <Grid columns={columns} gap={gap} className="item-grid__container">
            {items.map((item, idx) => (
              <Grid.Item key={item.id || idx}>
                {renderItem ? (
                  renderItem(item, idx)
                ) : (
                  <ItemCard
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    titleColor={itemTitleColor}
                    textColor={itemTextColor}
                  />
                )}
              </Grid.Item>
            ))}
          </Grid>
        </Flex>
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
  columns: PropTypes.number,
  gap: PropTypes.string,
  dataElement: PropTypes.string,
};
