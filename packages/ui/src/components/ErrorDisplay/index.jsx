import './index.scss';

import PropTypes from 'prop-types';

export const ErrorDisplay = ({
  title,
  message,
  details,
  showDetails = false,
  actions,
  size = "medium",
  t,
}) => {
  // Translation helper with fallback
  const translate = (key, fallback) => {
    return t ? t(key, fallback) : fallback;
  };

  const sizeClass = size === "small" ? "error-display--small" : "";

  return (
    <div className={`error-display ${sizeClass}`}>
      <div className="error-display__container">
        <div className="error-display__icon-wrapper">
          <div className="error-display__icon-pulse" />
          <svg
            className="error-display__icon"
            width={size === "small" ? "40" : "64"}
            height={size === "small" ? "40" : "64"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h2 className="error-display__title">{title}</h2>

        {message && <div className="error-display__message">{message}</div>}

        {showDetails && details && process.env.NODE_ENV === "development" && (
          <details className="error-display__details">
            <summary className="error-display__details-summary">
              <svg
                className="error-display__chevron"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {translate("errorDisplay.showDetails", "Technical details")}
            </summary>
            <div className="error-display__details-content">
              <pre className="error-display__error-text">{details}</pre>
            </div>
          </details>
        )}

        {actions && <div className="error-display__actions">{actions}</div>}
      </div>
    </div>
  );
};

ErrorDisplay.propTypes = {
  title: PropTypes.node.isRequired,
  message: PropTypes.node,
  details: PropTypes.string,
  showDetails: PropTypes.bool,
  actions: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium"]),
  t: PropTypes.func,
};
