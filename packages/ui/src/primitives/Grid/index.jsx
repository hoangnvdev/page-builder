import "./index.scss";

import PropTypes from "prop-types";

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
