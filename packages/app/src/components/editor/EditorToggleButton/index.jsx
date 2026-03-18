import { memo, useMemo } from "react";

import { FilePenLine } from "lucide-react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// Memoized toggle button - isolated to prevent rerenders
export const EditorToggleButton = memo(({ isPanelVisible, onClick }) => {
  const { t } = useTranslation();

  const label = useMemo(
    () =>
      isPanelVisible
        ? t("editor.accessibility.closePanel")
        : t("editor.accessibility.openPanel"),
    [isPanelVisible, t],
  );

  return (
    <button
      className="editor__toggle-panel"
      onClick={onClick}
      aria-label={label}
    >
      <span className="editor__toggle-tooltip">{label}</span>
      <FilePenLine size={24} />
    </button>
  );
});

EditorToggleButton.displayName = "EditorToggleButton";
EditorToggleButton.propTypes = {
  isPanelVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
