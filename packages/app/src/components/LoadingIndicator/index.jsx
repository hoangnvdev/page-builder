import "./index.scss";

import PropTypes from "prop-types";

import { EmptyState } from "@page-builder/ui";

export const LoadingIndicator = ({
  icon = "⏳",
  title = "Loading...",
  description = "Please wait while we fetch the data.",
}) => {
  return (
    <div className="loading-indicator">
      <EmptyState icon={icon} title={title} description={description} />
    </div>
  );
};

LoadingIndicator.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};
