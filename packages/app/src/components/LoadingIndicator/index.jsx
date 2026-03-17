import "./index.scss";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const LoadingIndicator = ({ title, description, size = "large" }) => {
  const { t } = useTranslation();

  return (
    <div className="loading-indicator">
      <div className="loading-indicator__container">
        <div
          className={`loading-indicator__spinner loading-indicator__spinner--${size}`}
        >
          <div className="loading-indicator__spinner-ring"></div>
          <div className="loading-indicator__spinner-ring"></div>
          <div className="loading-indicator__spinner-ring"></div>
          <div className="loading-indicator__spinner-core"></div>
        </div>

        {title && (
          <h2 className="loading-indicator__title">
            {title || t("loading.default.title")}
          </h2>
        )}

        {description && (
          <p className="loading-indicator__description">
            {description || t("loading.default.description")}
          </p>
        )}
      </div>
    </div>
  );
};

LoadingIndicator.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
