import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  resetCurrentConfig,
  resetToGallery,
} from '../store/builderSlice';
import { ExportButton } from './ExportButton';
import { PreviewRenderer } from './PreviewRenderer';
import { PropertyPanel } from './PropertyPanel';

export const Editor = () => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector((state) => state.builder.selectedTemplate);
  const [isPanelOpen, setIsPanelOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!selectedTemplate) {
    return null;
  }

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const handleResetToGallery = () => dispatch(resetToGallery());
  const handleResetCurrentConfig = () => dispatch(resetCurrentConfig());

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Top Toolbar */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
          padding: isMobile ? "8px 12px" : "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "16px", flex: "1", minWidth: "0" }}>
          <button
            onClick={handleResetToGallery}
            style={{
              background: "none",
              border: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              cursor: "pointer",
              color: "#666",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "6px",
              transition: "background-color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            {isMobile ? "←" : "← Back to Templates"}
          </button>
          {!isMobile && (
            <>
              <div
                style={{
                  height: "24px",
                  width: "1px",
                  backgroundColor: "#e0e0e0",
                }}
              />
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  color: "#1a1a1a",
                  fontWeight: "600",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedTemplate.name}
              </h2>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {isMobile && (
            <button
              onClick={togglePanel}
              style={{
                backgroundColor: isPanelOpen ? "#0066cc" : "#f5f5f5",
                color: isPanelOpen ? "white" : "#333",
                border: "1px solid #d0d0d0",
                padding: "8px 12px",
                fontSize: "0.95rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              ⚙️
            </button>
          )}
          {!isMobile && (
            <button
              onClick={handleResetCurrentConfig}
              style={{
                backgroundColor: "#f5f5f5",
                color: "#333",
                border: "1px solid #d0d0d0",
                padding: "8px 16px",
                fontSize: "0.95rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e8e8e8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
            >
              Reset to Default
            </button>
          )}
          <ExportButton isMobile={isMobile} />
        </div>
      </div>

      {/* Main Editor Area */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
        <PreviewRenderer />
        <PropertyPanel
          isOpen={isPanelOpen}
          isMobile={isMobile}
          onClose={() => setIsPanelOpen(false)}
          onReset={handleResetCurrentConfig}
        />
      </div>
    </div>
  );
};
