import "./index.scss";

import PropTypes from "prop-types";

/**
 * Grid component for CSS Grid layouts
 * @param {Object} props
 * @param {React.ReactNode} props.children - Grid items
 * @param {number} props.columns - Number of columns (default: 12)
 * @param {string|number} props.gap - Gap between items (e.g., '16px', 16)
 * @param {string|number} props.rowGap - Gap between rows
 * @param {string|number} props.columnGap - Gap between columns
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
export const Grid = ({
  children,
  columns = 12,
  gap,
  rowGap,
  columnGap,
  className = "",
  style = {},
  ...rest
}) => {
  const gridClasses = ["grid", className].filter(Boolean).join(" ");

  const gridStyle = {
    ...style,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    ...(gap && { gap: typeof gap === "number" ? `${gap}px` : gap }),
    ...(rowGap && {
      rowGap: typeof rowGap === "number" ? `${rowGap}px` : rowGap,
    }),
    ...(columnGap && {
      columnGap: typeof columnGap === "number" ? `${columnGap}px` : columnGap,
    }),
  };

  return (
    <div className={gridClasses} style={gridStyle} {...rest}>
      {children}
    </div>
  );
};

/**
 * Grid.Item component for individual grid items
 * @param {Object} props
 * @param {React.ReactNode} props.children - Item content
 * @param {number} props.span - Number of columns to span (default: 1)
 * @param {number} props.rowSpan - Number of rows to span (default: 1)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
Grid.Item = function GridItem({
  children,
  span = 1,
  rowSpan = 1,
  className = "",
  style = {},
  ...rest
}) {
  const itemClasses = ["grid__item", className].filter(Boolean).join(" ");

  const itemStyle = {
    ...style,
    gridColumn: `span ${span}`,
    gridRow: `span ${rowSpan}`,
  };

  return (
    <div className={itemClasses} style={itemStyle} {...rest}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.number,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columnGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
};

Grid.Item.propTypes = {
  children: PropTypes.node,
  span: PropTypes.number,
  rowSpan: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};
