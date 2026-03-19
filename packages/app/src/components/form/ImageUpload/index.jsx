import "./index.scss";

import { memo, useRef, useState } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const ImageUpload = memo(
  ({
    id,
    label,
    value, // base64 string or URL
    onChange,
    acceptedFormats = [
      "image/png",
      "image/jpeg",
      "image/svg+xml",
      "image/webp",
    ],
    maxSize = 2048, // KB
  }) => {
    const { t } = useTranslation();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setError("");
      setIsLoading(true);

      try {
        // Validate file type
        if (!acceptedFormats.includes(file.type)) {
          setError(
            t("imageUpload.error.invalidType", {
              types: acceptedFormats.map((f) => f.split("/")[1]).join(", "),
            }),
          );
          setIsLoading(false);
          return;
        }

        // Validate file size
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > maxSize) {
          setError(
            t("imageUpload.error.tooLarge", {
              maxSize: maxSize >= 1024 ? `${maxSize / 1024}MB` : `${maxSize}KB`,
            }),
          );
          setIsLoading(false);
          return;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          onChange(base64);
          setIsLoading(false);
        };
        reader.onerror = () => {
          setError(t("imageUpload.error.readFailed"));
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError(t("imageUpload.error.unknown"));
        setIsLoading(false);
      }
    };

    const handleRemove = () => {
      onChange("");
      setError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className="image-upload">
        <label className="image-upload__label">{label}</label>

        <div className="image-upload__container">
          {value ? (
            // Preview state
            <div className="image-upload__preview">
              <img
                src={value}
                alt={t("imageUpload.previewAlt")}
                className="image-upload__preview-image"
              />
              <div className="image-upload__preview-actions">
                <button
                  type="button"
                  className="image-upload__button image-upload__button--change"
                  onClick={handleClick}
                >
                  {t("imageUpload.change")}
                </button>
                <button
                  type="button"
                  className="image-upload__button image-upload__button--remove"
                  onClick={handleRemove}
                >
                  {t("imageUpload.remove")}
                </button>
              </div>
            </div>
          ) : (
            // Upload state
            <div className="image-upload__empty" onClick={handleClick}>
              <div className="image-upload__empty-icon">📁</div>
              <p className="image-upload__empty-text">
                {t("imageUpload.clickToUpload")}
              </p>
              <p className="image-upload__empty-hint">
                {t("imageUpload.acceptedFormats", {
                  formats: acceptedFormats
                    .map((f) => f.split("/")[1])
                    .join(", "),
                })}
              </p>
              <p className="image-upload__empty-hint">
                {t("imageUpload.maxSize", {
                  size:
                    maxSize >= 1024 ? `${maxSize / 1024}MB` : `${maxSize}KB`,
                })}
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            id={id}
            accept={acceptedFormats.join(",")}
            onChange={handleFileSelect}
            className="image-upload__input"
            style={{ display: "none" }}
          />
        </div>

        {error && <div className="image-upload__error">⚠️ {error}</div>}

        {isLoading && (
          <div className="image-upload__loading">
            {t("imageUpload.loading")}...
          </div>
        )}
      </div>
    );
  },
);

ImageUpload.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  acceptedFormats: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
};

ImageUpload.displayName = "ImageUpload";
