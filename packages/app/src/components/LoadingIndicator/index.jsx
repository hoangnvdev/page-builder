import './index.scss';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@page-builder/ui';

export const LoadingIndicator = ({ icon = "⏳", title, description }) => {
  const { t } = useTranslation();

  return (
    <div className="loading-indicator">
      <EmptyState
        icon={icon}
        title={title || t("loading.default.title")}
        description={description || t("loading.default.description")}
      />
    </div>
  );
};

LoadingIndicator.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};
