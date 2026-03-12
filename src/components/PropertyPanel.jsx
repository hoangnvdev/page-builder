import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  ColorPicker,
  Flex,
  Input,
  Panel,
  Select,
  Textarea,
} from "../common";
import {
  deselectElement as deselectElementAction,
  updateElementConfig,
  updatePageConfig,
} from "../store/builderSlice";

export const PropertyPanel = () => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const selectedElement = useSelector((state) => state.builder.selectedElement);
  const currentConfig = useSelector((state) => state.builder.currentConfig);

  if (!selectedTemplate || !currentConfig) return null;

  const isPageLevel = !selectedElement;
  const schema = isPageLevel
    ? selectedTemplate.configSchema.page
    : selectedTemplate.configSchema.elements[selectedElement];

  const config = isPageLevel
    ? currentConfig.page
    : currentConfig.elements[selectedElement];

  const handleSubmit = (values) => {
    // Formik handles the form state, we update on change
  };

  const handleChange = (key, value) => {
    if (isPageLevel) {
      dispatch(updatePageConfig({ [key]: value }));
    } else {
      dispatch(
        updateElementConfig({
          elementId: selectedElement,
          updates: { [key]: value },
        }),
      );
    }
  };

  const handleDeselectElement = () => {
    dispatch(deselectElementAction());
  };

  return (
    <Panel width="320px" position="right">
      {/* Header */}
      <Panel.Header>
        <Flex justify="space-between" align="center">
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                margin: 0,
                color: "#1a1a1a",
                fontWeight: "600",
              }}
            >
              {isPageLevel
                ? "Page Settings"
                : `${capitalizeFirst(selectedElement)} Section`}
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#666",
                margin: "4px 0 0 0",
              }}
            >
              {isPageLevel
                ? "Global page settings"
                : "Click to edit properties"}
            </p>
          </div>
          {!isPageLevel && (
            <Button
              variant="ghost"
              onClick={handleDeselectElement}
              title="Back to page settings"
              style={{ fontSize: "1.25rem" }}
            >
              ←
            </Button>
          )}
        </Flex>
      </Panel.Header>

      {/* Controls with Formik */}
      <Panel.Content>
        <Formik
          initialValues={config}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form>
              <Flex direction="column" gap={20}>
                {Object.entries(schema).map(([key, fieldSchema]) => (
                  <FormField
                    key={key}
                    name={key}
                    schema={fieldSchema}
                    value={config[key]}
                    onChange={(value) => handleChange(key, value)}
                  />
                ))}
              </Flex>
            </Form>
          )}
        </Formik>
      </Panel.Content>
    </Panel>
  );
};

const FormField = ({ name, schema, value, onChange }) => {
  if (schema.type === "text") {
    return (
      <Input label={schema.label} value={value || ""} onChange={onChange} />
    );
  }

  if (schema.type === "textarea") {
    return (
      <Textarea
        label={schema.label}
        value={value || ""}
        onChange={onChange}
        rows={4}
      />
    );
  }

  if (schema.type === "color") {
    return (
      <ColorPicker
        label={schema.label}
        value={value || "#000000"}
        onChange={onChange}
      />
    );
  }

  if (schema.type === "select") {
    return (
      <Select
        label={schema.label}
        value={value || ""}
        onChange={onChange}
        options={schema.options}
      />
    );
  }

  if (schema.type === "projects-list") {
    return (
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {schema.label}
        </label>
        {value &&
          value.map((item, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "12px",
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                border: "1px solid #e0e0e0",
              }}
            >
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx] = { ...newItems[idx], title: e.target.value };
                  onChange(newItems);
                }}
                placeholder="Title"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                  marginBottom: "6px",
                }}
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx] = {
                    ...newItems[idx],
                    description: e.target.value,
                  };
                  onChange(newItems);
                }}
                placeholder="Description"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
      </div>
    );
  }

  if (schema.type === "features-list") {
    return (
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {schema.label}
        </label>
        {value &&
          value.map((item, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "12px",
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                border: "1px solid #e0e0e0",
              }}
            >
              <input
                type="text"
                value={item.icon}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx] = { ...newItems[idx], icon: e.target.value };
                  onChange(newItems);
                }}
                placeholder="Icon (emoji)"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                  marginBottom: "6px",
                }}
              />
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx] = { ...newItems[idx], title: e.target.value };
                  onChange(newItems);
                }}
                placeholder="Title"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                  marginBottom: "6px",
                }}
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => {
                  const newItems = [...value];
                  newItems[idx] = {
                    ...newItems[idx],
                    description: e.target.value,
                  };
                  onChange(newItems);
                }}
                placeholder="Description"
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  border: "1px solid #d0d0d0",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
      </div>
    );
  }

  return null;
};

const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
