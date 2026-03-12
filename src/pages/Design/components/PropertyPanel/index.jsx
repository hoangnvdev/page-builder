import "./index.scss";

import { useDispatch, useSelector } from "react-redux";

import { Flex } from "@/common/Flex";
import { Panel } from "@/common/Panel";
import { updateConfig } from "@/store/builderSlice";
import { deepMerge, getNestedValue, setNestedValue } from "@/utils/helpers";

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
