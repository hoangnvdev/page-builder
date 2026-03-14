import './index.scss';

import PropTypes from 'prop-types';

import {
  Container,
  Divider,
  Flex,
  Section,
  Text,
  Title,
} from '@page-builder/ui';

export const TechSpecs = ({
  heading,
  specs,
  backgroundColor,
  padding = "80px 20px",
  headingLevel = 2,
  maxWidth = "800px",
  rowPadding = "16px 0",
  showDividers = true,
  dividerColor = "#e0e0e0",
  dataElement,
  className = "",
  renderSpec,
  ...props
}) => {
  return (
    <Section
      className={`tech-specs ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" gap={24}>
          {heading && (
            <Title level={headingLevel} className="tech-specs__heading">
              {heading}
            </Title>
          )}
          <Flex direction="column" gap={0} className="tech-specs__table">
            {specs.map((spec, index) => (
              <div key={index}>
                {renderSpec ? (
                  renderSpec(spec, index)
                ) : (
                  <Flex
                    className="tech-specs__row"
                    justify="space-between"
                    style={{ padding: rowPadding }}
                  >
                    <Text className="tech-specs__category" weight="medium">
                      {spec.category}
                    </Text>
                    <Text className="tech-specs__value">{spec.value}</Text>
                  </Flex>
                )}
                {showDividers && index < specs.length - 1 && (
                  <Divider color={dividerColor} spacing={0} />
                )}
              </div>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};

TechSpecs.propTypes = {
  heading: PropTypes.string,
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  backgroundColor: PropTypes.string,
  dataElement: PropTypes.string,
};
