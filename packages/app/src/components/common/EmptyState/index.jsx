import './index.scss';

import PropTypes from 'prop-types';

import { SubTitle } from '../../typography/SubTitle';
import { Title } from '../../typography/Title';

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
      {title && (
        <Title level={3} className="empty-state__title">
          {title}
        </Title>
      )}
      {description && (
        <SubTitle className="empty-state__description">{description}</SubTitle>
      )}
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
