import './index.scss';

import { useState } from 'react';

import {
  Check,
  Download,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  downloadHTML,
  exportToHTML,
} from '@/utils/exportHTML.jsx';
import { Button } from '@page-builder/ui';

export const ExportButton = () => {
  const { t } = useTranslation();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    if (!selectedTemplate || !currentConfig) return;

    setIsExporting(true);

    try {
      // Generate HTML
      const htmlContent = exportToHTML(
        selectedTemplate.component,
        currentConfig,
        selectedTemplate.name,
      );

      // Generate filename
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `${selectedTemplate.id}-${timestamp}.html`;

      // Download
      downloadHTML(htmlContent, filename);

      // Show success feedback
      setTimeout(() => {
        setIsExporting(false);
      }, 1000);
    } catch (error) {
      console.error("Export failed:", error);
      alert(t("export.error.failedMessage"));
      setIsExporting(false);
    }
  };

  return (
    <Button variant="export" onClick={handleExport} disabled={isExporting}>
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
    </Button>
  );
};
