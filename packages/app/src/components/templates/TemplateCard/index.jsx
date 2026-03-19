import "./index.scss";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { AppButton } from "../../common/AppButton";
import { Card } from "../../layout/Card";
import { TemplatePreview } from "../TemplatePreview";

export const TemplateCard = ({ template, onSelect, isSelecting = false }) => {
  const { t } = useTranslation();

  const handleCardClick = () => {
    if (isSelecting) return;
    onSelect(template);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (isSelecting) return;
    onSelect(template);
  };

  return (
    <Card hoverable className="template-card" onClick={handleCardClick}>
      <div className="template-card__preview-wrapper">
        <div className="template-card__preview">
          <TemplatePreview template={template} />
          <div className="template-card__preview-overlay">
            <span className="template-card__preview-text">
              {t("templateCard.hover.useTemplate")}
            </span>
          </div>
          {isSelecting && (
            <div className="template-card__loading-overlay">
              <div className="template-card__loading-spinner"></div>
              <span className="template-card__loading-text">
                {t("templateCard.loading.preparing")}
              </span>
            </div>
          )}
        </div>
      </div>
      <Card.Content className="template-card__content">
        <Card.Title className="template-card__title">
          {template.name}
        </Card.Title>
        <Card.Description className="template-card__description">
          {template.description}
        </Card.Description>
        <Card.Actions>
          <AppButton
            variant="primary"
            onClick={handleButtonClick}
            className="template-card__button"
          >
            {t("templateCard.button.useTemplate")}
          </AppButton>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
};

TemplateCard.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelecting: PropTypes.bool,
};
