import "./index.scss";

import { useMemo } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import {
  Button,
  ColorPicker,
  EmptyState,
  Flex,
  Input,
  Label,
  Select,
  Slider,
  Textarea,
  Toggle,
} from "@page-builder/ui";

export const FormField = ({
  id,
  label,
  type,
  value,
  onChange,
  options,
  items,
  min,
  max,
  step,
  labels,
}) => {
  const { t } = useTranslation();
  // Generate a stable unique ID for the field
  const fieldId = useMemo(() => `field-${id.replace(/\./g, "-")}`, [id]);
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
        return (
          <Input id={fieldId} label={label} value={value} onChange={onChange} />
        );

      case "textarea":
        return (
          <Textarea
            id={fieldId}
            label={label}
            value={value}
            onChange={onChange}
            rows={4}
          />
        );

      case "color":
        return (
          <ColorPicker
            id={fieldId}
            label={label}
            value={value}
            onChange={onChange}
          />
        );

      case "select":
        // Skip select fields without options defined (incomplete schema)
        if (!options || !Array.isArray(options) || options.length === 0) {
          return (
            <EmptyState
              description={t("formField.warning.missingOptions", { label })}
              className="form-field__warning"
            />
          );
        }
        return (
          <Select
            id={fieldId}
            label={label}
            value={value}
            onChange={onChange}
            options={options}
          />
        );

      case "number":
        return (
          <Input
            id={fieldId}
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
          <Toggle value={value || false} onChange={onChange} label={label} />
        );

      case "slider":
        return (
          <Slider
            value={value ?? (min || 0)}
            min={min || 0}
            max={max || 100}
            step={step || 1}
            onChange={onChange}
            label={label}
            labels={labels}
            showValue={!labels}
          />
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
                  {t("formField.button.addItem")}
                </Button>
              </Flex>
            </Label>

            {items?.map((item, index) => (
              <div key={item.id || index} className="form-field__list-item">
                <Input
                  id={`${fieldId}-item-${index}-title`}
                  label={`${type === "projects-list" ? t("formField.label.project") : t("formField.label.feature")} ${index + 1} ${t("formField.label.itemTitle")}`}
                  value={item.title || ""}
                  onChange={(value) => handleItemChange(index, "title", value)}
                />

                <Textarea
                  id={`${fieldId}-item-${index}-description`}
                  label={t("formField.label.description")}
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
                  {t("formField.button.remove")}
                </Button>
              </div>
            ))}

            {(!items || items.length === 0) && (
              <EmptyState
                description={t("formField.emptyState.noItems")}
                className="form-field__empty-state"
              />
            )}
          </div>
        );

      default:
        return (
          <EmptyState
            description={t("formField.error.unknownType", { type })}
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
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string),
};
