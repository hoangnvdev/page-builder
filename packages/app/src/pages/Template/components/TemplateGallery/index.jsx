import "./index.scss";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoadingIndicator } from "@/components";
import { fetchTemplatesFromAPI } from "@/services";
import { selectTemplate } from "@/store/builderSlice";
import { processTemplateConfig } from "@/utils";
import { Button, EmptyState, Grid, SubTitle, Title } from "@page-builder/ui";

import { TemplateCard } from "../TemplateCard";

export const TemplateGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError(null);

      const rawTemplates = await fetchTemplatesFromAPI();
      const processedTemplates = rawTemplates
        .map((config) => {
          try {
            return processTemplateConfig(config);
          } catch (err) {
            console.error(`Failed to process template ${config.id}:`, err);
            return null;
          }
        })
        .filter(Boolean); // Remove failed templates

      setTemplates(processedTemplates);
    } catch (err) {
      console.error("Failed to load templates:", err);
      setError(err.message || "Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template) => {
    dispatch(selectTemplate(template));
    navigate("/design");
  };

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingIndicator
          title="Loading Templates"
          description="Fetching available templates..."
        />
      );
    }

    if (error) {
      return (
        <div className="template-gallery__error">
          <EmptyState
            icon="❌"
            title="Failed to Load Templates"
            description={error}
          />
          <Button onClick={loadTemplates} style={{ marginTop: "1rem" }}>
            Retry
          </Button>
        </div>
      );
    }

    if (templates.length === 0) {
      return (
        <EmptyState
          icon="📄"
          title="No Templates Available"
          description="No templates found."
        />
      );
    }

    return (
      <Grid columns={3} gap={24}>
        {templates.map((template) => (
          <Grid.Item key={template.id}>
            <TemplateCard template={template} onSelect={handleSelectTemplate} />
          </Grid.Item>
        ))}
      </Grid>
    );
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div className="template-gallery">
      <div className="template-gallery__container">
        <div className="template-gallery__header">
          <Title level={1} className="template-gallery__title">
            Choose Your Template
          </Title>
          {!loading && !error && templates.length > 0 && (
            <SubTitle className="template-gallery__description">
              Select a template to start building your page. All templates are
              fully customizable.
            </SubTitle>
          )}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};
