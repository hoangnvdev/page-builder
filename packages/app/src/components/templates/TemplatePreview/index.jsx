import "./index.scss";

import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { useIsVisible } from "@/hooks";
import { fetchTemplatePreviewHTML } from "@/services/fakeAPIService";
import { ErrorDisplay } from "@page-builder/ui";

export const TemplatePreview = ({ template }) => {
  const { t } = useTranslation();
  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [containerRef, isVisible] = useIsVisible({
    rootMargin: "50px",
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!isVisible || !template?.id) {
      return;
    }

    let isCancelled = false;

    const loadPreview = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch preview data from API (mechanism kept for future integration)
        const data = await fetchTemplatePreviewHTML(template.id);

        if (isCancelled) return;

        setPreviewData(data);
      } catch (err) {
        if (!isCancelled) {
          console.error("Error loading template preview:", err);
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPreview();

    return () => {
      isCancelled = true;
    };
  }, [template?.id, isVisible]);

  return (
    <div
      ref={containerRef}
      className={`template-preview ${isLoading ? "template-preview--loading" : ""} ${error ? "template-preview--error" : ""}`}
    >
      {isVisible ? (
        <>
          {previewData && (
            <div className="template-preview__content">
              <div className="template-preview__icon">{previewData.icon}</div>
              <div className="template-preview__name">{previewData.name}</div>
            </div>
          )}
          {isLoading && (
            <div className="template-preview__loader">
              <div className="template-preview__spinner"></div>
            </div>
          )}
          {error && (
            <ErrorDisplay
              size="small"
              title={t("templatePreview.error.title", "Preview Failed")}
              message={t(
                "templatePreview.error.message",
                "Unable to load template preview",
              )}
              details={error}
              showDetails={true}
              t={t}
            />
          )}
        </>
      ) : (
        <div className="template-preview__placeholder">
          <div className="template-preview__placeholder-icon">
            {template.icon}
          </div>
        </div>
      )}
    </div>
  );
};

TemplatePreview.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
  }).isRequired,
};
