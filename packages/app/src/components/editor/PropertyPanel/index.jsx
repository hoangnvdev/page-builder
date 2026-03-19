import "./index.scss";

import { memo, useCallback, useMemo, useRef } from "react";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useSelection } from "@/contexts/SelectionContext";
import { useFieldHandlers, useScrollToTopOnSelection } from "@/hooks";
import { deepMerge, getNestedValue } from "@/utils";
import {
  getFieldsForElement,
  getSingularTemplateName,
} from "@/utils/schemaProcessor";

import { EmptyState } from "../../common/EmptyState";
import { FormField } from "../../form/FormField";
import { Flex } from "../../layout/Flex";
import { Panel } from "../../layout/Panel";
import { SubTitle } from "../../typography/SubTitle";
import { Title } from "../../typography/Title";
import { HistoryControls } from "../HistoryControls";

export const PropertyPanel = () => {
  const { t, i18n } = useTranslation();
  const { selectedElement, selectedSubElement } = useSelection();
  const {
    getOnChangeHandler,
    getOnBlurHandler,
    getOnChangeEndHandler,
    shouldUseBlur,
    shouldUseChangeEnd,
  } = useFieldHandlers();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);

  // Cache for enhanced field options (cleared when template changes)
  const enhancedFieldsCache = useRef(new Map());
  const lastTemplateId = useRef(selectedTemplate?.id);

  // Clear cache when template changes
  if (lastTemplateId.current !== selectedTemplate?.id) {
    enhancedFieldsCache.current.clear();
    lastTemplateId.current = selectedTemplate?.id;
  }

  // Memoize tempConfig to avoid recreating it on every render
  const tempConfig = useMemo(
    () => deepMerge(selectedTemplate?.defaultConfig || {}, currentConfig || {}),
    [selectedTemplate?.defaultConfig, currentConfig],
  );

  // Scroll PropertyPanel to top when selection changes
  useScrollToTopOnSelection(selectedSubElement || selectedElement);

  // Helper: Enhance field options to include template default if not present
  // This preserves custom template values and allows users to reset individual fields
  const enhanceFieldOptions = useCallback(
    (field) => {
      // Check cache first
      if (enhancedFieldsCache.current.has(field.path)) {
        return enhancedFieldsCache.current.get(field.path);
      }

      // Only enhance select fields with options
      if (
        field.type !== "select" ||
        !field.options ||
        !Array.isArray(field.options)
      ) {
        enhancedFieldsCache.current.set(field.path, field);
        return field;
      }

      // Get the template default value for this field
      const templateDefaultValue = getNestedValue(
        selectedTemplate?.defaultConfig || {},
        field.path,
      );

      // If no template default or it's already in options, return as-is
      if (
        templateDefaultValue === undefined ||
        field.options.some((opt) => opt.value === templateDefaultValue)
      ) {
        enhancedFieldsCache.current.set(field.path, field);
        return field;
      }

      // Add template default to options with a user-friendly label
      const enhancedOptions = [
        ...field.options,
        {
          value: templateDefaultValue,
          label: t("propertyPanel.templateDefault"),
        },
      ];

      const enhancedField = {
        ...field,
        options: enhancedOptions,
      };

      enhancedFieldsCache.current.set(field.path, enhancedField);
      return enhancedField;
    },
    [selectedTemplate, t],
  );

  // Check if a field should be visible based on its dependency
  // Memoized to avoid recalculation on every render
  // IMPORTANT: Must be called before any conditional returns (Rules of Hooks)
  const shouldShowField = useCallback(
    (field) => {
      if (!field.dependency) return true;

      const { dependsOn, showWhen, operator = "equals" } = field.dependency;

      // Get the value of the field this field depends on
      const dependencyValue = getNestedValue(tempConfig, dependsOn);

      // Check the operator
      switch (operator) {
        case "equals":
          return dependencyValue === showWhen;
        case "notEquals":
          return dependencyValue !== showWhen;
        case "includes":
          return (
            Array.isArray(dependencyValue) && dependencyValue.includes(showWhen)
          );
        case "exists":
          return (
            dependencyValue !== undefined &&
            dependencyValue !== null &&
            dependencyValue !== ""
          );
        default:
          return true;
      }
    },
    [tempConfig],
  );

  //============================================
  // EARLY RETURNS (all hooks must be above)
  //============================================

  if (!selectedTemplate) {
    return (
      <Panel position="right" width="100%" className="property-panel">
        <Panel.Header>
          <Title level={3}>{t("propertyPanel.title.properties")}</Title>
        </Panel.Header>
        <Panel.Content>
          <EmptyState
            description={t("propertyPanel.emptyState.selectTemplate")}
          />
        </Panel.Content>
      </Panel>
    );
  }

  // Determine what element we're editing
  const activeElementId = selectedSubElement || selectedElement;

  if (!activeElementId) {
    // Show page-level settings when nothing is selected
    const pageFields = getFieldsForElement(
      selectedTemplate,
      "page",
      tempConfig,
    );

    return (
      <Panel position="right" width="100%" className="property-panel">
        <Panel.Header>
          <Title level={3}>{t("propertyPanel.title.pageSettings")}</Title>
          <SubTitle className="property-panel__subtitle">
            {selectedTemplate.name}
          </SubTitle>
        </Panel.Header>
        <Panel.Content>
          <Flex direction="column" gap={24}>
            {pageFields.fields.map((field) => {
              const enhancedField = enhanceFieldOptions(field);
              const fieldValue = getNestedValue(tempConfig, field.path);
              const usesBlur = shouldUseBlur(enhancedField.type);
              const usesChangeEnd = shouldUseChangeEnd(enhancedField.type);

              return (
                <FormField
                  key={field.path}
                  id={field.path}
                  label={enhancedField.label}
                  type={enhancedField.type}
                  value={fieldValue || ""}
                  onChange={getOnChangeHandler(field.path, enhancedField.type)}
                  onBlur={usesBlur ? getOnBlurHandler(field.path) : undefined}
                  onChangeEnd={
                    usesChangeEnd
                      ? getOnChangeEndHandler(field.path)
                      : undefined
                  }
                  options={enhancedField.options}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  labels={field.labels}
                />
              );
            })}
          </Flex>
        </Panel.Content>
        <HistoryControls />
      </Panel>
    );
  }

  // Get fields for the selected element from the schema
  const elementFields = getFieldsForElement(
    selectedTemplate,
    activeElementId,
    tempConfig,
  );

  if (!elementFields.fields || elementFields.fields.length === 0) {
    return (
      <Panel position="right" width="100%" className="property-panel">
        <Panel.Header>
          <Title level={3}>{t("propertyPanel.title.properties")}</Title>
        </Panel.Header>
        <Panel.Content>
          <EmptyState
            description={`${t("propertyPanel.emptyState.noPropertiesPrefix")} "${activeElementId}"`}
          />
        </Panel.Content>
        <HistoryControls />
      </Panel>
    );
  }

  // Format element label for display
  const formatElementLabel = (label, elementId) => {
    const parts = elementId.split(".");

    // Check if this is selecting an array item (has a numeric index in the path)
    const arrayIndexPos = parts.findIndex((part) => /^\d+$/.test(part));

    if (arrayIndexPos !== -1) {
      // This is an array item selection
      const arrayIndex = parseInt(parts[arrayIndexPos]);
      const sectionName = parts[0]; // e.g., "imageGrid"

      // Format the section name properly
      const formattedSection = sectionName
        .replace(/([A-Z])/g, " $1")
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");

      // Get the array name if there's a sub-path before the index
      if (arrayIndexPos > 1) {
        const arrayName = parts[arrayIndexPos - 1];
        // Convert to singular and capitalize
        const singularName = getSingularTemplateName(arrayName);
        const formattedArrayName = singularName
          .replace(/([A-Z])/g, " $1")
          .trim()
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");

        // Convert to 1-based index
        const displayIndex = arrayIndex + 1;

        // If there are more parts after the index, it's a nested property
        if (arrayIndexPos + 1 < parts.length) {
          const propertyName = parts.slice(arrayIndexPos + 1).join(" ");
          const formattedProperty = propertyName
            .replace(/([A-Z])/g, " $1")
            .trim()
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(" ");
          return `${formattedSection} ${formattedArrayName} ${displayIndex} ${formattedProperty}`;
        }

        return `${formattedSection} ${formattedArrayName} ${displayIndex}`;
      }

      // Just section and index (e.g., "hero.0")
      // Convert to 1-based index
      const displayIndex = arrayIndex + 1;
      return `${formattedSection} Item ${displayIndex}`;
    }

    // No array index - check if label looks malformed (contains spaces followed by numbers)
    if (label && /\s+\d+$/.test(label)) {
      // Label ends with a number (like "Image 0"), keep it as is
      return label;
    }

    return label;
  };

  // Calculate panel title and subtitle (inline - not expensive)
  const formattedLabel = formatElementLabel(
    elementFields.label,
    activeElementId,
  );

  // Check if current language is RTL
  const isRTL =
    i18n.language.split("-")[0] === "ar" ||
    i18n.language.split("-")[0] === "he";

  // Check if current language is Vietnamese (needs prefix order like RTL)
  const isVietnamese = i18n.language.split("-")[0] === "vi";

  // Build title and subtitle with proper word order for RTL and Vietnamese
  const panelTitle = isRTL
    ? `${formattedLabel} ${t("propertyPanel.title.editPrefix")}`
    : `${t("propertyPanel.title.editPrefix")} ${formattedLabel}`;

  const panelSubtitle = selectedSubElement
    ? isRTL || isVietnamese
      ? `${t("propertyPanel.subtitle.sectionSuffix")} ${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)}`
      : `${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)} ${t("propertyPanel.subtitle.sectionSuffix")}`
    : selectedTemplate.name;

  return (
    <Panel position="right" width="100%" className="property-panel">
      <Panel.Header>
        <Title level={3}>{panelTitle}</Title>
        <SubTitle className="property-panel__subtitle">
          {panelSubtitle}
        </SubTitle>
      </Panel.Header>
      <Panel.Content>
        <Flex direction="column" gap={24}>
          {/* Render all fields */}
          {elementFields.fields.map((field) => {
            // Check if field should be visible
            if (!shouldShowField(field)) return null;

            const enhancedField = enhanceFieldOptions(field);
            let fieldValue = getNestedValue(tempConfig, field.path);

            // Convert numbers to strings for Select component if needed
            if (
              enhancedField.type === "select" &&
              typeof fieldValue === "number"
            ) {
              fieldValue = String(fieldValue);
            }

            const usesBlur = shouldUseBlur(enhancedField.type);
            const usesChangeEnd = shouldUseChangeEnd(enhancedField.type);

            return (
              <FormField
                key={field.path}
                id={field.path}
                label={enhancedField.label}
                type={enhancedField.type}
                value={fieldValue ?? ""}
                onChange={getOnChangeHandler(field.path, enhancedField.type)}
                onBlur={usesBlur ? getOnBlurHandler(field.path) : undefined}
                onChangeEnd={
                  usesChangeEnd ? getOnChangeEndHandler(field.path) : undefined
                }
                options={enhancedField.options}
                min={field.min}
                max={field.max}
                step={field.step}
                labels={field.labels}
              />
            );
          })}
        </Flex>
      </Panel.Content>
      <HistoryControls />
    </Panel>
  );
};

// Memoize to prevent rerenders during resize drag operations
export const MemoizedPropertyPanel = memo(PropertyPanel);
MemoizedPropertyPanel.displayName = "MemoizedPropertyPanel";
