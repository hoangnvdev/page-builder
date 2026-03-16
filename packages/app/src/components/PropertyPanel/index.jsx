import "./index.scss";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { updateConfig } from "@/store/builderSlice";
import { getFieldsForElement } from "@/utils/schemaProcessor";
import { deepMerge, getNestedValue, setNestedValue } from "@helpers";
import { EmptyState, Flex, Panel, SubTitle, Title } from "@page-builder/ui";

import { FormField } from "../FormField";

export const PropertyPanel = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);
  const selectedElement = useSelector((state) => state.builder.selectedElement);
  const selectedSubElement = useSelector(
    (state) => state.builder.selectedSubElement,
  );

  const tempConfig = deepMerge(
    selectedTemplate?.defaultConfig || {},
    currentConfig || {},
  );

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
    const pageFields = getFieldsForElement(selectedTemplate, "page");

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
              const fieldValue = getNestedValue(tempConfig, field.path);
              return (
                <FormField
                  key={field.path}
                  id={field.path}
                  label={field.label}
                  type={field.type}
                  value={fieldValue || ""}
                  onChange={(value) => {
                    const newConfig = JSON.parse(JSON.stringify(tempConfig));
                    setNestedValue(newConfig, field.path, value);
                    dispatch(updateConfig(newConfig));
                  }}
                  options={field.options}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  labels={field.labels}
                />
              );
            })}
          </Flex>
        </Panel.Content>
      </Panel>
    );
  }

  // Get fields for the selected element from the schema
  const elementFields = getFieldsForElement(selectedTemplate, activeElementId);

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
      </Panel>
    );
  }

  // Handle field changes
  const handleFieldChange = (fieldPath, value) => {
    const newConfig = JSON.parse(JSON.stringify(tempConfig));
    setNestedValue(newConfig, fieldPath, value);
    dispatch(updateConfig(newConfig));
  };

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
        const formattedArrayName = arrayName
          .replace(/([A-Z])/g, " $1")
          .trim()
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");

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
          return `${formattedSection} ${formattedArrayName} ${arrayIndex + 1} ${formattedProperty}`;
        }

        return `${formattedSection} ${formattedArrayName} ${arrayIndex + 1}`;
      }

      // Just section and index (e.g., "hero.0")
      return `${formattedSection} Item ${arrayIndex + 1}`;
    }

    // No array index - check if label looks malformed (contains spaces followed by numbers)
    if (label && /\s+\d+$/.test(label)) {
      // Label ends with a number (like "Image 0"), try to make it friendlier
      return label.replace(
        /\s+(\d+)$/,
        (match, num) => ` ${parseInt(num) + 1}`,
      );
    }

    return label;
  };

  // Get panel title and subtitle
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
          {elementFields.fields.map((field) => {
            let fieldValue = getNestedValue(tempConfig, field.path);

            // Convert numbers to strings for Select component if needed
            if (field.type === "select" && typeof fieldValue === "number") {
              fieldValue = String(fieldValue);
            }

            return (
              <FormField
                key={field.path}
                id={field.path}
                label={field.label}
                type={field.type}
                value={fieldValue ?? ""}
                onChange={(value) => handleFieldChange(field.path, value)}
                options={field.options}
                min={field.min}
                max={field.max}
                step={field.step}
                labels={field.labels}
              />
            );
          })}
        </Flex>
      </Panel.Content>
    </Panel>
  );
};
