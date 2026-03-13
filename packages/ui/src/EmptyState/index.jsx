import "./index.scss";

import PropTypes from "prop-types";

/**
 * EmptyState component for displaying empty states
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon element
 * @param {string} props.title - Main title text
 * @param {string} props.description - Description text
 * @param {React.ReactNode} props.action - Action button or element
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = "",
  style = {},
  ...rest
}) => {
  const emptyStateClasses = ["empty-state", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={emptyStateClasses} style={style} {...rest}>
      {icon && <div className="empty-state__icon">{icon}</div>}
      {title && <h3 className="empty-state__title">{title}</h3>}
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};
