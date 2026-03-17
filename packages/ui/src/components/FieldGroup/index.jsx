import './index.scss';

import { useState } from 'react';

import PropTypes from 'prop-types';

export const FieldGroup = ({
  title,
  children,
  defaultExpanded = true,
  collapsible = true,
  className = "",
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  const groupClasses = [
    "field-group",
    collapsible && "field-group--collapsible",
    isExpanded && "field-group--expanded",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={groupClasses} {...props}>
      <div
        className="field-group__header"
        onClick={toggleExpanded}
        role={collapsible ? "button" : undefined}
        tabIndex={collapsible ? 0 : undefined}
        onKeyDown={(e) => {
          if (collapsible && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            toggleExpanded();
          }
        }}
      >
        {collapsible && (
          <span className="field-group__icon">{isExpanded ? "▼" : "▶"}</span>
        )}
        <h4 className="field-group__title">{title}</h4>
      </div>
      {isExpanded && <div className="field-group__content">{children}</div>}
    </div>
  );
};

FieldGroup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  defaultExpanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  className: PropTypes.string,
};
