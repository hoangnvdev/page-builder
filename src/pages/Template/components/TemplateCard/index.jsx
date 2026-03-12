import "./index.scss";

import PropTypes from "prop-types";

import { Button } from "@/common/Button";
import { Card } from "@/common/Card";

export const TemplateCard = ({ template, onSelect }) => {
  return (
    <Card hoverable>
      <Card.Image>
        <div className="template-card__icon">{template.icon}</div>
      </Card.Image>
      <Card.Content>
        <Card.Title>{template.name}</Card.Title>
        <Card.Description>{template.description}</Card.Description>
        <Card.Actions>
          <Button variant="primary" onClick={() => onSelect(template)}>
            Use Template
          </Button>
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
