import "./index.scss";

import { memo, useMemo } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { EmptyState } from "../../common/EmptyState";
import { ColorPicker } from "../ColorPicker";
import { ImageUpload } from "../ImageUpload";
import { Input } from "../Input";
import { Radio } from "../Radio";
import { RadioGroup } from "../RadioGroup";
import { Select } from "../Select";
import { Slider } from "../Slider";
import { Textarea } from "../Textarea";
import { Toggle } from "../Toggle";

export const FormField = memo(
  ({
    id,
    label,
    type,
    value,
    onChange,
    onBlur,
    onChangeEnd,
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
        label: t(`options.${option.label}`, option.label),
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
              onBlur={onBlur}
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
              onBlur={onBlur}
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
              onBlur={onBlur}
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
              onBlur={onBlur}
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
              onChangeEnd={onChangeEnd}
              label={translatedLabel}
              labels={labels}
              showValue={!labels}
            />
          );

        case "imageUpload":
          return (
            <ImageUpload
              id={fieldId}
              label={translatedLabel}
              value={value || ""}
              onChange={onChange}
              acceptedFormats={options?.acceptedFormats}
              maxSize={options?.maxSize}
            />
          );

        case "radio":
          return (
            <RadioGroup
              id={fieldId}
              label={translatedLabel}
              value={value}
              onChange={onChange}
              options={getTranslatedOptions(options || [])}
              orientation={options?.orientation || "vertical"}
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
  },
  (prevProps, nextProps) => {
    // Custom comparison for React.memo
    // Return true if props are equal (prevent re-render)
    // Return false if props changed (allow re-render)

    // Check simple props
    if (
      prevProps.id !== nextProps.id ||
      prevProps.label !== nextProps.label ||
      prevProps.type !== nextProps.type ||
      prevProps.value !== nextProps.value ||
      prevProps.onChange !== nextProps.onChange ||
      prevProps.onChangeEnd !== nextProps.onChangeEnd ||
      prevProps.min !== nextProps.min ||
      prevProps.max !== nextProps.max ||
      prevProps.step !== nextProps.step
    ) {
      return false;
    }

    // Deep compare options array
    if (Array.isArray(prevProps.options) && Array.isArray(nextProps.options)) {
      if (prevProps.options.length !== nextProps.options.length) {
        return false;
      }
      for (let i = 0; i < prevProps.options.length; i++) {
        if (
          prevProps.options[i].value !== nextProps.options[i].value ||
          prevProps.options[i].label !== nextProps.options[i].label
        ) {
          return false;
        }
      }
    } else if (prevProps.options !== nextProps.options) {
      return false;
    }

    // Deep compare labels object
    if (prevProps.labels || nextProps.labels) {
      if (!prevProps.labels || !nextProps.labels) {
        return false;
      }
      const prevKeys = Object.keys(prevProps.labels);
      const nextKeys = Object.keys(nextProps.labels);
      if (prevKeys.length !== nextKeys.length) {
        return false;
      }
      for (const key of prevKeys) {
        if (prevProps.labels[key] !== nextProps.labels[key]) {
          return false;
        }
      }
    }

    return true; // Props are equal, prevent re-render
  },
);

FormField.displayName = "FormField";

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
    "radio",
    "imageUpload",
  ]).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onChangeEnd: PropTypes.func,
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
