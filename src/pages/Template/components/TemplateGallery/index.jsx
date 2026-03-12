import "./index.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Grid } from "@/common/Grid";
import { selectTemplate } from "@/store/builderSlice";
import { templateRegistry } from "@/templates/templateRegistry";

import { TemplateCard } from "../TemplateCard";

export const TemplateGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectTemplate = (template) => {
    dispatch(selectTemplate(template));
    navigate("/design");
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
              <TemplateCard
                template={template}
                onSelect={handleSelectTemplate}
              />
            </Grid.Item>
          ))}
        </Grid>
      </div>
    </div>
  );
};
