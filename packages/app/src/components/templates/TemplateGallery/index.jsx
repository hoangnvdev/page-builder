import "./index.scss";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ErrorBoundary,
  ErrorDisplay,
  LanguageSwitcher,
  LoadingIndicator,
} from "@/components";
import { useWindowResize } from "@/hooks";
import { fetchTemplateByIdFromAPI, fetchTemplatesFromAPI } from "@/services";
import { selectTemplate } from "@/store/builderSlice";
import { processTemplateConfig } from "@/utils";

import { EmptyState } from "../../common/EmptyState";
import { SubTitle } from "../../typography/SubTitle";
import { Title } from "../../typography/Title";
import { TemplateCard } from "../TemplateCard";

export const TemplateGallery = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectingTemplateId, setSelectingTemplateId] = useState(null);

  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch lightweight metadata only - no processing needed
      const templates = await fetchTemplatesFromAPI();

      setTemplates(templates);
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
      setSelectingTemplateId(null);
    }
  };

  const calculateGridHeight = () => {
    if (!gridRef.current || !headerRef.current || templates.length === 0)
      return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let columns = 2;
    if (viewportWidth >= 1920) {
      columns = 4;
    } else if (viewportWidth >= 1440) {
      columns = 3;
    } else if (viewportWidth <= 768) {
      columns = 1;
    }

    const rows = Math.ceil(templates.length / columns);
    const headerHeight = headerRef.current.offsetHeight;
    const galleryPadding =
      viewportWidth <= 768 ? 48 : viewportWidth <= 1024 ? 64 : 96;
    const availableHeight = viewportHeight - headerHeight - galleryPadding;

    let rowHeightPercentage;
    if (rows === 1) {
      rowHeightPercentage = 0.8;
    } else {
      rowHeightPercentage = 0.65;
    }

    const calculatedRowHeight = availableHeight * rowHeightPercentage;

    let minRowHeight;
    if (viewportWidth <= 480) {
      minRowHeight = 360;
    } else if (viewportWidth <= 768) {
      minRowHeight = 420;
    } else {
      minRowHeight = 500;
    }

    const rowHeight = Math.max(calculatedRowHeight, minRowHeight);
    gridRef.current.style.setProperty("--row-height", `${rowHeight}px`);
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
      <div className="template-gallery__grid" ref={gridRef}>
        {templates.map((template) => (
          <div key={template.id} className="template-gallery__grid-item">
            <ErrorBoundary mode="inline" t={t}>
              <TemplateCard
                template={template}
                onSelect={handleSelectTemplate}
                isSelecting={selectingTemplateId === template.id}
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

  useWindowResize(calculateGridHeight, [templates, loading, error], {
    debounceMs: 100,
  });

  return (
    <div className="template-gallery">
      <div className="template-gallery__container">
        <div className="template-gallery__header" ref={headerRef}>
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
