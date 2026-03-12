import "./index.scss";

import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../../../common/Button";
import { ColorPicker } from "../../../../common/ColorPicker";
import { Flex } from "../../../../common/Flex";
import { Input } from "../../../../common/Input";
import { Panel } from "../../../../common/Panel";
import { Select } from "../../../../common/Select";
import { Textarea } from "../../../../common/Textarea";
import { updateConfig } from "../../../../store/builderSlice";

// Helper function to get nested value using dot notation
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};

// Helper function to set nested value using dot notation
const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
  return obj;
};

// Deep merge helper
const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

const FormField = ({ id, label, type, value, onChange, options, items }) => {
  const handleItemChange = (index, field, newValue) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: newValue };
    onChange(newItems);
  };

  const handleAddItem = () => {
    const newItem = { title: "", description: "" };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, idx) => idx !== index);
    onChange(newItems);
  };

  if (type === "projects-list" || type === "features-list") {
    return (
      <div className="property-panel__field-container">
        <label className="property-panel__field-label">
          {label}
          <Flex gap={8} style={{ marginTop: "0.5rem" }}>
            <Button variant="secondary" size="small" onClick={handleAddItem}>
              + Add Item
            </Button>
          </Flex>
        </label>

        {items?.map((item, index) => (
          <div key={index} className="property-panel__list-item">
            <Input
              label={`${type === "projects-list" ? "Project" : "Feature"} ${index + 1} Title`}
              value={item.title || ""}
              onChange={(value) => handleItemChange(index, "title", value)}
            />

            <Textarea
              label="Description"
              value={item.description || ""}
              onChange={(value) =>
                handleItemChange(index, "description", value)
              }
              rows={3}
            />

            <Button
              variant="danger"
              size="small"
              onClick={() => handleRemoveItem(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        {(!items || items.length === 0) && (
          <p className="property-panel__empty-text">
            No items yet. Click "Add Item" to create one.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="property-panel__field">
      {type === "text" && (
        <Input label={label} value={value} onChange={onChange} />
      )}
      {type === "textarea" && (
        <Textarea label={label} value={value} onChange={onChange} rows={4} />
      )}
      {type === "color" && (
        <ColorPicker label={label} value={value} onChange={onChange} />
      )}
      {type === "select" && (
        <Select
          label={label}
          value={value}
          onChange={onChange}
          options={options}
        />
      )}
    </div>
  );
};

export const PropertyPanel = () => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);
  const selectedElement = useSelector((state) => state.builder.selectedElement);

  const tempConfig = deepMerge(
    selectedTemplate?.defaultConfig || {},
    currentConfig || {},
  );

  const handleFieldChange = (fieldId, value) => {
    const newConfig = JSON.parse(JSON.stringify(tempConfig));
    setNestedValue(newConfig, fieldId, value);
    dispatch(updateConfig(newConfig));
  };

  if (!selectedTemplate) {
    return (
      <Panel position="right" width="350px" className="property-panel">
        <Panel.Header>
          <h3>Properties</h3>
        </Panel.Header>
        <Panel.Content>
          <div className="property-panel__empty">
            <p>Select a template to edit its properties</p>
          </div>
        </Panel.Content>
      </Panel>
    );
  }

  // Filter fields based on selected element
  let fields = [];
  let panelTitle = "Properties";

  if (selectedElement) {
    // Show only fields for the selected element
    const elementPrefix = `elements.${selectedElement}.`;
    fields = (selectedTemplate.editableFields || []).filter((field) =>
      field.id.startsWith(elementPrefix),
    );
    panelTitle = `Edit ${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)}`;
  } else {
    // Show page-level fields when no element is selected
    fields = (selectedTemplate.editableFields || []).filter((field) =>
      field.id.startsWith("page."),
    );
    panelTitle = "Page Settings";
  }

  return (
    <Panel position="right" width="350px" className="property-panel">
      <Panel.Header>
        <h3>{panelTitle}</h3>
        <p className="property-panel__subtitle">{selectedTemplate.name}</p>
      </Panel.Header>
      <Panel.Content>
        {fields.length === 0 ? (
          <div className="property-panel__empty">
            <p>
              {selectedElement
                ? "No editable fields for this section"
                : "Click on a section in the preview to edit it"}
            </p>
          </div>
        ) : (
          <Flex direction="column" gap={24}>
            {fields.map((field) => (
              <FormField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                value={getNestedValue(tempConfig, field.id)}
                onChange={(value) => handleFieldChange(field.id, value)}
                options={field.options}
                items={getNestedValue(tempConfig, field.id)}
              />
            ))}
          </Flex>
        )}
      </Panel.Content>
    </Panel>
  );
};
