import "./index.scss";

import { useDispatch, useSelector } from "react-redux";

import { updateConfig } from "@/store/builderSlice";
import { deepMerge, getNestedValue, setNestedValue } from "@helpers";
import { EmptyState, Flex, Panel, SubTitle, Title } from "@page-builder/ui";

import { FormField } from "../FormField";

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
      <Panel position="right" width="100%" className="property-panel">
        <Panel.Header>
          <Title level={3}>Properties</Title>
        </Panel.Header>
        <Panel.Content>
          <EmptyState description="Select a template to edit its properties" />
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
    <Panel position="right" width="100%" className="property-panel">
      <Panel.Header>
        <Title level={3}>{panelTitle}</Title>
        <SubTitle className="property-panel__subtitle">
          {selectedTemplate.name}
        </SubTitle>
      </Panel.Header>
      <Panel.Content>
        {fields.length === 0 ? (
          <EmptyState
            description={
              selectedElement
                ? "No editable fields for this section"
                : "Click on a section in the preview to edit it"
            }
          />
        ) : (
          <Flex direction="column" gap={24}>
            {fields.map((field) => (
              <FormField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                value={
                  field.type === "projects-list" ||
                  field.type === "features-list"
                    ? undefined
                    : getNestedValue(tempConfig, field.id)
                }
                onChange={(value) => handleFieldChange(field.id, value)}
                options={field.options}
                items={
                  field.type === "projects-list" ||
                  field.type === "features-list"
                    ? getNestedValue(tempConfig, field.id)
                    : undefined
                }
              />
            ))}
          </Flex>
        )}
      </Panel.Content>
    </Panel>
  );
};
