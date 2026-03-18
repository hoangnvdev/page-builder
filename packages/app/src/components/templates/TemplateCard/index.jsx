import './index.scss';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { AppButton } from '../../common/AppButton';
import { Card } from '../../layout/Card';

export const TemplateCard = ({ template, onSelect }) => {
  const { t } = useTranslation();

  return (
    <Card hoverable>
      <Card.Image>
        <div className="template-card__icon">{template.icon}</div>
      </Card.Image>
      <Card.Content>
        <Card.Title>{template.name}</Card.Title>
        <Card.Description>{template.description}</Card.Description>
        <Card.Actions>
          <AppButton variant="primary" onClick={() => onSelect(template)}>
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
};
