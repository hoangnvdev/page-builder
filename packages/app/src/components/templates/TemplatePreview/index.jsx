import "./index.scss";

import { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { LoadingIndicator } from "@/components";
import { useIsVisible } from "@/hooks";
import { fetchTemplatePreviewHTML } from "@/services/fakeAPIService";
import { ErrorDisplay } from "@page-builder/ui";

export const TemplatePreview = ({ template }) => {
  const { t } = useTranslation();
  const iframeRef = useRef(null);
  const iframeBackgroundRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [containerRef, isVisible] = useIsVisible({
    rootMargin: "50px",
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (
      !isVisible ||
      !iframeRef.current ||
      !iframeBackgroundRef.current ||
      !template?.id
    ) {
      return;
    }

    let isCancelled = false;

    const loadPreview = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch rendered HTML from API
        const htmlContent = await fetchTemplatePreviewHTML(template.id);

        if (isCancelled) return;

        // Inject HTML into both iframes
        const injectHTML = (iframe, scale = 1) => {
          const iframeDoc =
            iframe.contentDocument || iframe.contentWindow.document;

          // Modify HTML to apply scale if needed
          let modifiedHTML = htmlContent;
          if (scale !== 1) {
            modifiedHTML = htmlContent.replace(
              "<body>",
              `<body style="transform: scale(${scale}); transform-origin: top left; width: ${100 / scale}%; height: ${100 / scale}%;">`,
            );
          }

          iframeDoc.open();
          iframeDoc.write(modifiedHTML);
          iframeDoc.close();

          return new Promise((resolve) => {
            iframe.onload = resolve;
          });
        };

        // Inject into both iframes with different scales
        await Promise.all([
          injectHTML(iframeBackgroundRef.current, 0.25), // Background (scaled down)
          injectHTML(iframeRef.current, 0.25), // Main preview (scaled down)
        ]);

        if (!isCancelled) {
          setIsLoaded(true);
        }
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
      className={`template-preview ${!isLoaded ? "template-preview--loading" : ""} ${error ? "template-preview--error" : ""}`}
    >
      {isVisible ? (
        <>
          {/* Blurred background iframe */}
          <iframe
            ref={iframeBackgroundRef}
            className="template-preview__iframe-background"
            title={`${template.name} background`}
            sandbox="allow-same-origin"
            loading="lazy"
          />
          {/* Main centered iframe */}
          <iframe
            ref={iframeRef}
            className="template-preview__iframe"
            title={`${template.name} preview`}
            sandbox="allow-same-origin"
            loading="lazy"
          />
          {(isLoading || !isLoaded) && !error && (
            <div className="template-preview__loader">
              <LoadingIndicator size="small" />
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
