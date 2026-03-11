import React from 'react';

import { useDispatch } from 'react-redux';

import { selectTemplate as selectTemplateAction } from '../store/builderSlice';
import { templateRegistry } from '../templates/templateRegistry';

export const TemplateGallery = () => {
  const dispatch = useDispatch();

  const handleSelectTemplate = (template) => {
    dispatch(selectTemplateAction(template));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              margin: "0 0 16px 0",
              color: "#1a1a1a",
              fontWeight: "700",
            }}
          >
            Choose Your Template
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.2rem)",
              color: "#666",
              margin: 0,
            }}
          >
            Select a template to start building your website
          </p>
        </div>

        {/* Template Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
            gap: "20px",
          }}
        >
          {templateRegistry.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={() => handleSelectTemplate(template)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TemplateCard = ({ template, onSelect }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: isHovered
          ? "0 12px 24px rgba(0,0,0,0.15)"
          : "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "pointer",
      }}
      onClick={onSelect}
    >
      {/* Preview */}
      <div
        style={{
          backgroundColor: "#f0f0f0",
          height: "clamp(200px, 40vw, 280px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(80px, 15vw, 120px)",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {template.preview}
      </div>

      {/* Info */}
      <div style={{ padding: "clamp(16px, 4vw, 24px)" }}>
        <h3
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
            margin: "0 0 8px 0",
            color: "#1a1a1a",
            fontWeight: "600",
          }}
        >
          {template.name}
        </h3>
        <p
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
            color: "#666",
            margin: "0 0 16px 0",
            lineHeight: "1.5",
          }}
        >
          {template.description}
        </p>
        <button
          style={{
            backgroundColor: isHovered ? "#0052a3" : "#0066cc",
            color: "white",
            border: "none",
            padding: "10px 24px",
            fontSize: "1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            width: "100%",
            transition: "background-color 0.2s ease",
          }}
        >
          Select Template
        </button>
      </div>
    </div>
  );
};
