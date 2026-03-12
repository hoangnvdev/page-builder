import "./index.scss";

import { useDispatch } from "react-redux";

import { Button } from "../../common/Button";
import { Card } from "../../common/Card";
import { Grid } from "../../common/Grid";
import { selectTemplate } from "../../store/builderSlice";
import { templateRegistry } from "../../templates/templateRegistry";

export const TemplateGallery = () => {
  const dispatch = useDispatch();

  const handleSelectTemplate = (template) => {
    dispatch(selectTemplate(template));
  };

  return (
    <div className="template-gallery">
      <div className="template-gallery__container">
        <div className="template-gallery__header">
          <h1 className="template-gallery__title">Choose Your Template</h1>
          <p className="template-gallery__description">
            Select a template to start building your page. All templates are
            fully customizable.
          </p>
        </div>

        <Grid columns={3} gap={24}>
          {templateRegistry.map((template) => (
            <Grid.Item key={template.id}>
              <Card hoverable>
                <Card.Image>
                  <div className="template-gallery__card-icon">
                    {template.icon}
                  </div>
                </Card.Image>
                <Card.Content>
                  <Card.Title>{template.name}</Card.Title>
                  <Card.Description>{template.description}</Card.Description>
                  <Card.Actions>
                    <Button
                      variant="primary"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      Use Template
                    </Button>
                  </Card.Actions>
                </Card.Content>
              </Card>
            </Grid.Item>
          ))}
        </Grid>
      </div>
    </div>
  );
};
