import './index.scss';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { updateConfig } from '@/store/builderSlice';
import { getFieldsForElement } from '@/utils/schemaProcessor';
import {
  deepMerge,
  getNestedValue,
  setNestedValue,
} from '@helpers';
import {
  EmptyState,
  Flex,
  Panel,
  SubTitle,
  Title,
} from '@page-builder/ui';

import { FormField } from '../FormField';

export const PropertyPanel = () => {
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
          <Title level={3}>Properties</Title>
        </Panel.Header>
        <Panel.Content>
          <EmptyState description="Select a template to edit its properties" />
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
          <Title level={3}>Page Settings</Title>
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
          <Title level={3}>Properties</Title>
        </Panel.Header>
        <Panel.Content>
          <EmptyState
            description={`No editable properties defined for "${activeElementId}"`}
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

  // Get panel title and subtitle
  const panelTitle = `Edit ${elementFields.label}`;
  const panelSubtitle = selectedSubElement
    ? `${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)} Section`
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
