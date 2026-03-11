import React from 'react';

import {
  Form,
  Formik,
} from 'formik';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  deselectElement as deselectElementAction,
  updateElementConfig,
  updatePageConfig,
} from '../store/builderSlice';

export const PropertyPanel = ({ isOpen = true, isMobile = false, onClose, onReset }) => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector((state) => state.builder.selectedTemplate);
  const selectedElement = useSelector((state) => state.builder.selectedElement);
  const currentConfig = useSelector((state) => state.builder.currentConfig);

  if (!selectedTemplate || !currentConfig) return null;
  if (!isOpen && isMobile) return null;

  const isPageLevel = !selectedElement;
  const schema = isPageLevel
    ? selectedTemplate.configSchema.page
    : selectedTemplate.configSchema.elements[selectedElement];

  const config = isPageLevel
    ? currentConfig.page
    : currentConfig.elements[selectedElement];

  const handleSubmit = (values) => {
    // Formik handles the form state, we update on change
  };

  const handleChange = (key, value) => {
    if (isPageLevel) {
      dispatch(updatePageConfig({ [key]: value }));
    } else {
      dispatch(updateElementConfig({ elementId: selectedElement, updates: { [key]: value } }));
    }
  };

  const handleDeselectElement = () => {
    dispatch(deselectElementAction());
  };

  const panelStyle = isMobile
    ? {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "85%",
        maxWidth: "320px",
        backgroundColor: "white",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
        zIndex: 1000,
        overflowY: "auto",
        padding: "20px",
      }
    : {
        width: "320px",
        backgroundColor: "white",
        borderLeft: "1px solid #e0e0e0",
        height: "100%",
        overflowY: "auto",
        padding: "20px",
        flexShrink: 0,
      };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobile && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}

      <div style={panelStyle}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              margin: 0,
              color: "#1a1a1a",
              fontWeight: "600",
            }}
          >
            {isPageLevel
              ? "Page Settings"
              : `${capitalizeFirst(selectedElement)} Section`}
          </h3>
          <div style={{ display: "flex", gap: "8px" }}>
            {!isPageLevel && (
              <button
                onClick={handleDeselectElement}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "#666",
                  padding: "4px",
                }}
                title="Back to page settings"
              >
                ←
              </button>
            )}
            {isMobile && (
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "#666",
                  padding: "4px",
                }}
                title="Close panel"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <p
          style={{
            fontSize: "0.85rem",
            color: "#666",
            margin: "4px 0 0 0",
          }}
        >
          {isPageLevel ? "Global page settings" : "Click to edit properties"}
        </p>
      </div>

      {/* Controls with Formik */}
      <Formik
        initialValues={config}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {Object.entries(schema).map(([key, fieldSchema]) => (
                <FormField
                  key={key}
                  name={key}
                  schema={fieldSchema}
                  value={config[key]}
                  onChange={(value) => handleChange(key, value)}
                />
              ))}
            </div>
          </Form>
        )}
      </Formik>

      {/* Mobile Reset Button */}
      {isMobile && onReset && (
        <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #e0e0e0" }}>
          <button
            onClick={onReset}
            style={{
              backgroundColor: "#f5f5f5",
              color: "#333",
              border: "1px solid #d0d0d0",
              padding: "10px 16px",
              fontSize: "0.95rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              width: "100%",
            }}
          >
            Reset to Default
          </button>
        </div>
      )}
    </div>
    </>
  );
};

const FormField = ({ name, schema, value, onChange }) => {
  if (schema.type === "text") {
    return (
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {schema.label}
        </label>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "0.95rem",
            border: "1px solid #d0d0d0",
            borderRadius: "6px",
            boxSizing: "border-box",
          }}
        />
      </div>
    );
  }

  if (schema.type === "textarea") {
    return (
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {schema.label}
        </label>
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "0.95rem",
            border: "1px solid #d0d0d0",
            borderRadius: "6px",
            boxSizing: "border-box",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
      </div>
    );
  }

  if (schema.type === "color") {
    return (
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {schema.label}
        </label>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="color"
            value={value || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: "50px",
              height: "38px",
              border: "1px solid #d0d0d0",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          />
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              fontSize: "0.95rem",
              border: "1px solid #d0d0d0",
              borderRadius: "6px",
              fontFamily: "monospace",
            }}
          />
        </div>
      </div>
    );
  }

  if (schema.type === "select") {
    return (
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {schema.label}
        </label>
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "0.95rem",
            border: "1px solid #d0d0d0",
            borderRadius: "6px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          {schema.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (schema.type === "projects-list") {
    return (
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {schema.label}
        </label>
        {value &&
          value.map((item, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "12px",
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                border: "1px solid #e0e0e0",
              }}
            >
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx].title = e.target.value;
                  onChange(newItems);
                }}
                placeholder="Title"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                  marginBottom: "6px",
                }}
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx].description = e.target.value;
                  onChange(newItems);
                }}
                placeholder="Description"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
      </div>
    );
  }

  if (schema.type === "features-list") {
    return (
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {schema.label}
        </label>
        {value &&
          value.map((item, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "12px",
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                border: "1px solid #e0e0e0",
              }}
            >
              <input
                type="text"
                value={item.icon}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx].icon = e.target.value;
                  onChange(newItems);
                }}
                placeholder="Icon (emoji)"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                  marginBottom: "6px",
                }}
              />
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx].title = e.target.value;
                  onChange(newItems);
                }}
                placeholder="Title"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                  marginBottom: "6px",
                }}
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx].description = e.target.value;
                  onChange(newItems);
                }}
                placeholder="Description"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
      </div>
    );
  }

  return null;
};

const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
