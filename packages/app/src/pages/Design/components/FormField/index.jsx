import './index.scss';

import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import {
  Button,
  ColorPicker,
  EmptyState,
  Flex,
  Input,
  Label,
  Select,
  Textarea,
} from '@page-builder/ui';

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
    const newItem = {
      id: uuidv4(),
      title: "",
      description: "",
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, idx) => idx !== index);
    onChange(newItems);
  };

  const renderField = () => {
    switch (type) {
      case "text":
        return <Input label={label} value={value} onChange={onChange} />;

      case "textarea":
        return (
          <Textarea label={label} value={value} onChange={onChange} rows={4} />
        );

      case "color":
        return <ColorPicker label={label} value={value} onChange={onChange} />;

      case "select":
        return (
          <Select
            label={label}
            value={value}
            onChange={onChange}
            options={options}
          />
        );

      case "number":
        return (
          <Input
            label={label}
            type="number"
            value={value}
            onChange={onChange}
            min={options?.min}
            max={options?.max}
            step={options?.step || 1}
          />
        );

      case "toggle":
        return (
          <div className="form-field__toggle">
            <Label>{label}</Label>
            <Flex gap={8} align="center">
              <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => onChange(e.target.checked)}
                className="form-field__checkbox"
              />
              <span className="form-field__toggle-label">
                {value ? "Enabled" : "Disabled"}
              </span>
            </Flex>
          </div>
        );

      case "slider":
        return (
          <div className="form-field__slider">
            <Label>
              {label}
              <span className="form-field__slider-value">{value}</span>
            </Label>
            <input
              type="range"
              min={options?.min || 0}
              max={options?.max || 100}
              step={options?.step || 1}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="form-field__slider-input"
            />
            <Flex justify="space-between" className="form-field__slider-labels">
              <span>{options?.min || 0}</span>
              <span>{options?.max || 100}</span>
            </Flex>
          </div>
        );

      case "projects-list":
      case "features-list":
        return (
          <div className="form-field__container">
            <Label className="form-field__label">
              {label}
              <Flex gap={8} style={{ marginTop: "0.5rem" }}>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handleAddItem}
                >
                  + Add Item
                </Button>
              </Flex>
            </Label>

            {items?.map((item, index) => (
              <div key={item.id || index} className="form-field__list-item">
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
              <EmptyState
                description="No items yet. Click 'Add Item' to create one."
                className="form-field__empty-state"
              />
            )}
          </div>
        );

      default:
        return (
          <EmptyState
            description={`Unknown field type: "${type}". Please check the field configuration.`}
            className="form-field__error"
          />
        );
    }
  };

  return <div className="form-field">{renderField()}</div>;
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "textarea",
    "color",
    "select",
    "number",
    "toggle",
    "slider",
    "projects-list",
    "features-list",
  ]).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      step: PropTypes.number,
    }),
  ]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
};
