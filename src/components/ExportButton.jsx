import { useState } from "react";

import { useSelector } from "react-redux";

import { Button } from "../common/Button";
import { downloadHTML, exportToHTML } from "../utils/exportHTML.jsx";

export const ExportButton = () => {
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
      alert("Failed to export. Please try again.");
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="export"
      onClick={handleExport}
      disabled={isExporting}
      icon={isExporting ? "✓" : "↓"}
    >
      {isExporting ? "Exported!" : "Export HTML"}
    </Button>
  );
};
