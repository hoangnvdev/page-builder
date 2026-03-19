import "./index.scss";

import { createPortal } from "react-dom";

import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { withMemo } from "@/hocs";

const ConfirmDialogComponent = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  variant = "warning",
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  // Split message by sentences for better readability
  const sentences = message ? message.split(/(?<=\.\s)/g).filter(Boolean) : [];

  const dialog = (
    <div className="confirm-dialog-overlay" onClick={handleBackdropClick}>
      <div className={`confirm-dialog confirm-dialog--${variant}`}>
        <div className="confirm-dialog__icon">
          <AlertTriangle size={32} />
        </div>
        <div className="confirm-dialog__content">
          <h3 className="confirm-dialog__title">{title}</h3>
          <div className="confirm-dialog__message">
            {sentences.map((sentence, index) => (
              <p key={index} className="confirm-dialog__sentence">
                {sentence.trim()}
              </p>
            ))}
          </div>
        </div>
        <div className="confirm-dialog__actions">
          <button
            className="confirm-dialog__button confirm-dialog__button--cancel"
            onClick={onCancel}
          >
            {cancelText || t("confirmDialog.cancel")}
          </button>
          <button
            className={`confirm-dialog__button confirm-dialog__button--confirm confirm-dialog__button--${variant}`}
            onClick={onConfirm}
          >
            {confirmText || t("confirmDialog.confirm")}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
};

export const ConfirmDialog = withMemo(ConfirmDialogComponent);
