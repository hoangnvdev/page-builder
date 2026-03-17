import './index.scss';

import { useMemo } from 'react';

import PropTypes from 'prop-types';

import {
  Container,
  Divider,
  Flex,
  Section,
  Text,
} from '@page-builder/ui';

export const QuoteBlock = ({
  quote,
  author,
  backgroundColor,
  quoteColor,
  dividerColor,
  quoteSize = "large",
  maxWidth = "800px",
  padding = "80px 20px",
  gap = 20,
  dividerWidth = "60px",
  showDivider = true,
  dataElement,
  className = "",
  children,
  ...props
}) => {
  // Memoize quote style
  const quoteStyle = useMemo(
    () => ({ color: quoteColor, maxWidth }),
    [quoteColor, maxWidth],
  );

  // Memoize divider style
  const dividerStyle = useMemo(() => ({ width: dividerWidth }), [dividerWidth]);

  // Memoize author style
  const authorStyle = useMemo(() => ({ color: quoteColor }), [quoteColor]);

  return (
    <Section
      className={`quote-block ${className}`}
      backgroundColor={backgroundColor}
      padding={padding}
      dataElement={dataElement}
    >
      <Container maxWidth={maxWidth}>
        <Flex direction="column" align="center" gap={gap}>
          <Text
            as="blockquote"
            size={quoteSize}
            weight="medium"
            align="center"
            className="quote-block__quote"
            style={quoteStyle}
            data-element={`${dataElement}.quote`}
          >
            "{quote}"
          </Text>
          {showDivider && (
            <Divider
              className="quote-block__divider"
              color={dividerColor}
              spacing={0}
              style={dividerStyle}
            />
          )}
          {author && (
            <Text
              className="quote-block__author"
              weight="medium"
              style={authorStyle}
              data-element={`${dataElement}.author`}
            >
              {author}
            </Text>
          )}
          {children}
        </Flex>
      </Container>
    </Section>
  );
};

QuoteBlock.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  quoteColor: PropTypes.string,
  dividerColor: PropTypes.string,
  dataElement: PropTypes.string,
};
