import './index.scss';

import {
  useEffect,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  LanguageSwitcher,
  LoadingIndicator,
} from '@/components';
import {
  fetchTemplateByIdFromAPI,
  fetchTemplatesFromAPI,
} from '@/services';
import { selectTemplate } from '@/store/builderSlice';
import { processTemplateConfig } from '@/utils';
import {
  Button,
  EmptyState,
  SubTitle,
  Title,
} from '@page-builder/ui';

import { TemplateCard } from '../TemplateCard';

export const TemplateGallery = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectingTemplateId, setSelectingTemplateId] = useState(null);

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

  const handleSelectTemplate = async (template) => {
    try {
      setSelectingTemplateId(template.id);

      // Simulate fetching full template details from API
      const fullTemplateData = await fetchTemplateByIdFromAPI(template.id);
      const processedTemplate = processTemplateConfig(fullTemplateData);

      dispatch(selectTemplate(processedTemplate));
      navigate("/design");
    } catch (err) {
      console.error("Failed to select template:", err);
      setError(err.message || "Failed to load template");
    } finally {
      setSelectingTemplateId(null);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingIndicator
          title={t("templateGallery.loading.title")}
          description={t("templateGallery.loading.description")}
        />
      );
    }

    if (selectingTemplateId) {
      return (
        <LoadingIndicator
          icon="🎨"
          title={t("templateGallery.preparing.title")}
          description={t("templateGallery.preparing.description")}
        />
      );
    }

    if (error) {
      return (
        <div className="template-gallery__error">
          <EmptyState
            icon="❌"
            title={t("templateGallery.error.title")}
            description={error}
          />
          <Button onClick={loadTemplates} style={{ marginTop: "1rem" }}>
            {t("templateGallery.button.retry")}
          </Button>
        </div>
      );
    }

    if (templates.length === 0) {
      return (
        <EmptyState
          icon="📄"
          title={t("templateGallery.emptyState.title")}
          description={t("templateGallery.emptyState.description")}
        />
      );
    }

    return (
      <div className="template-gallery__grid">
        {templates.map((template) => (
          <div key={template.id} className="template-gallery__grid-item">
            <TemplateCard template={template} onSelect={handleSelectTemplate} />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div className="template-gallery">
      <div className="template-gallery__container">
        <div className="template-gallery__header">
          <div className="template-gallery__header-content">
            <Title level={1} className="template-gallery__title">
              {t("templateGallery.title")}
            </Title>
            {!loading && !error && templates.length > 0 && (
              <SubTitle className="template-gallery__description">
                {t("templateGallery.subtitle")}
              </SubTitle>
            )}
          </div>
          <div className="template-gallery__header-actions">
            <LanguageSwitcher />
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};
