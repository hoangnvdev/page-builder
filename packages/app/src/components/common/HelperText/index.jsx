import "./index.scss";

import { memo, useMemo } from "react";

import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// Memoized helper text component - completely isolated with its own translations
export const HelperText = memo(({ show, onDismiss }) => {
  const { t } = useTranslation();

  // Memoize translations inside the component for complete isolation
  const message = useMemo(() => t("preview.helperTip.message"), [t]);
  const closeLabel = useMemo(() => t("preview.accessibility.closeTip"), [t]);

  if (!show) return null;

  return (
    <div className="helper-text">
      <span className="helper-text__content">{message}</span>
      <button
        className="helper-text__close"
        onClick={onDismiss}
        aria-label={closeLabel}
      >
        <X size={16} />
      </button>
    </div>
  );
});

HelperText.displayName = "HelperText";
HelperText.propTypes = {
  show: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
