import './index.scss';

import {
  useEffect,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  ErrorBoundary,
  ErrorDisplay,
  LanguageSwitcher,
  LoadingIndicator,
} from '@/components';
import {
  fetchTemplateByIdFromAPI,
  fetchTemplatesFromAPI,
} from '@/services';
import { selectTemplate } from '@/store/builderSlice';
import { processTemplateConfig } from '@/utils';

import { EmptyState } from '../../common/EmptyState';
import { SubTitle } from '../../typography/SubTitle';
import { Title } from '../../typography/Title';
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
      // Don't clear selectingTemplateId here - keep loading indicator visible during navigation
      // Component will unmount when route changes anyway
    } catch (err) {
      console.error("Failed to select template:", err);
      setError(err.message || "Failed to load template");
      setSelectingTemplateId(null); // Only clear on error
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
        <ErrorDisplay
          title={t("templateGallery.error.title")}
          message={error}
          showDetails={true}
          details={error}
          t={t}
          actions={
            <button
              className="template-gallery__error-button"
              onClick={loadTemplates}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              {t("templateGallery.button.retry")}
            </button>
          }
        />
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
            <ErrorBoundary mode="inline" t={t}>
              <TemplateCard
                template={template}
                onSelect={handleSelectTemplate}
              />
            </ErrorBoundary>
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
