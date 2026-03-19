import "./index.scss";

import { useCallback } from "react";

import { Check, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useLoadingState } from "@/hooks";
import { downloadHTML, exportToHTML } from "@/utils/exportHTML.jsx";

import { AppButton } from "../../common/AppButton";

export const ExportButton = () => {
  const { t } = useTranslation();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);
  const { loading: isExporting, withLoading } = useLoadingState();

  const handleExport = useCallback(
    withLoading(async () => {
      if (!selectedTemplate || !currentConfig) return;

      try {
        const htmlContent = exportToHTML(
          selectedTemplate.component,
          currentConfig,
          selectedTemplate.name,
        );

        const timestamp = new Date().toISOString().split("T")[0];
        const filename = `${selectedTemplate.id}-${timestamp}.html`;

        downloadHTML(htmlContent, filename);

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Export failed:", error);
        alert(t("export.error.failedMessage"));
        throw error;
      }
    }),
    [selectedTemplate, currentConfig, t, withLoading],
  );

  return (
    <AppButton variant="export" onClick={handleExport} disabled={isExporting}>
      {isExporting ? (
        <>
          <Check size={16} />
          {t("export.button.exported")}
        </>
      ) : (
        <>
          <Download size={16} />
          {t("export.button.exportHtml")}
        </>
      )}
    </AppButton>
  );
};
