import React from 'react';

import { useSelector } from 'react-redux';

import {
  downloadHTML,
  exportToHTML,
} from '../utils/exportHTML.jsx';

export const ExportButton = ({ isMobile = false }) => {
  const selectedTemplate = useSelector((state) => state.builder.selectedTemplate);
  const currentConfig = useSelector((state) => state.builder.currentConfig);
  const [isExporting, setIsExporting] = React.useState(false);

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
    <button
      onClick={handleExport}
      disabled={isExporting}
      style={{
        backgroundColor: isExporting ? "#059669" : "#10b981",
        color: "white",
        border: "none",
        padding: "8px 20px",
        fontSize: "0.95rem",
        borderRadius: "6px",
        cursor: isExporting ? "default" : "pointer",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "background-color 0.2s",
      }}
      onMouseOver={(e) => {
        if (!isExporting) {
          e.currentTarget.style.backgroundColor = "#059669";
        }
      }}
      onMouseOut={(e) => {
        if (!isExporting) {
          e.currentTarget.style.backgroundColor = "#10b981";
        }
      }}
    >
      {isExporting ? (
        <>
          <span>✓</span>
          {!isMobile && <span>Exported!</span>}
        </>
      ) : (
        <>
          <span>↓</span>
          <span>{isMobile ? "Export" : "Export HTML"}</span>
        </>
      )}
    </button>
  );
};
