import "./index.scss";

import PropTypes from "prop-types";

import {
  Button,
  ColorPicker,
  Flex,
  Input,
  Select,
  Textarea,
} from "@page-builder/ui";

export const FormField = ({
  id,
  label,
  type,
  value,
  onChange,
  options,
  items,
}) => {
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
      <div className="form-field__container">
        <label className="form-field__label">
          {label}
          <Flex gap={8} style={{ marginTop: "0.5rem" }}>
            <Button variant="secondary" size="small" onClick={handleAddItem}>
              + Add Item
            </Button>
          </Flex>
        </label>

        {items?.map((item, index) => (
          <div key={index} className="form-field__list-item">
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
          <p className="form-field__empty-text">
            No items yet. Click "Add Item" to create one.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="form-field">
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

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "textarea",
    "color",
    "select",
    "projects-list",
    "features-list",
  ]).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
};
