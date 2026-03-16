import "./index.scss";

import { useMemo } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import {
  ColorPicker,
  EmptyState,
  Input,
  Radio,
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
  min,
  max,
  step,
  labels,
}) => {
  const { t } = useTranslation();
  // Generate a stable unique ID for the field
  const fieldId = useMemo(() => `field-${id.replace(/\./g, "-")}`, [id]);

  // Translate the label - support both translation keys and plain text
  const translatedLabel = useMemo(() => {
    // If label looks like a translation key (no spaces, camelCase or dot notation)
    if (label && !label.includes(" ") && !label.match(/[()]/)) {
      // Try with fields. prefix first
      const withPrefix = t(`fields.${label}`, { defaultValue: "" });
      if (withPrefix) return withPrefix;
      // Try without prefix
      return t(label, label);
    }
    // Fallback to original label for backward compatibility
    return label;
  }, [label, t]);

  // Helper: Translate option labels
  const getTranslatedOptions = (opts) =>
    opts.map((option) => ({
      ...option,
      label: t(`options.${option.value}`, option.label),
    }));

  // Render select field (Radio.Group for <4 options, Select for >=4)
  const renderSelectField = () => {
    if (!options || !Array.isArray(options) || options.length === 0) {
      return (
        <EmptyState
          description={t("formField.warning.missingOptions", {
            label: translatedLabel,
          })}
          className="form-field__warning"
        />
      );
    }

    const translatedOptions = getTranslatedOptions(options);

    if (options.length < 4) {
      return (
        <Radio.Group
          id={fieldId}
          label={translatedLabel}
          value={value}
          onChange={onChange}
          options={translatedOptions}
          orientation="vertical"
        />
      );
    }

    return (
      <Select
        id={fieldId}
        label={translatedLabel}
        value={value}
        onChange={onChange}
        options={translatedOptions}
      />
    );
  };

  const renderField = () => {
    switch (type) {
      case "text":
        return (
          <Input
            id={fieldId}
            label={translatedLabel}
            value={value}
            onChange={onChange}
            placeholder={
              label === "icon" ? t("ui.icon.placeholder") : undefined
            }
          />
        );

      case "textarea":
        return (
          <Textarea
            id={fieldId}
            label={translatedLabel}
            value={value}
            onChange={onChange}
            rows={4}
          />
        );

      case "color":
        return (
          <ColorPicker
            id={fieldId}
            label={translatedLabel}
            value={value}
            onChange={onChange}
          />
        );

      case "select":
        return renderSelectField();

      case "number":
        return (
          <Input
            id={fieldId}
            label={translatedLabel}
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
          <Toggle
            value={value || false}
            onChange={onChange}
            label={translatedLabel}
          />
        );

      case "slider":
        return (
          <Slider
            value={value ?? (min || 0)}
            min={min || 0}
            max={max || 100}
            step={step || 1}
            onChange={onChange}
            label={translatedLabel}
            labels={labels}
            showValue={!labels}
          />
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
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string),
};
