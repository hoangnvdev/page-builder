import { useDispatch } from "react-redux";

import { Button, Card, Grid } from "../common";
import { selectTemplate as selectTemplateAction } from "../store/builderSlice";
import { templateRegistry } from "../templates/templateRegistry";

export const TemplateGallery = () => {
  const dispatch = useDispatch();

  const handleSelectTemplate = (template) => {
    dispatch(selectTemplateAction(template));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              margin: "0 0 16px 0",
              color: "#1a1a1a",
              fontWeight: "700",
            }}
          >
            Choose Your Template
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.2rem)",
              color: "#666",
              margin: 0,
            }}
          >
            Select a template to start building your website
          </p>
        </div>

        {/* Template Grid */}
        <Grid
          columns={3}
          gap={20}
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
          }}
        >
          {templateRegistry.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={() => handleSelectTemplate(template)}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

const TemplateCard = ({ template, onSelect }) => {
  return (
    <Card hoverable onClick={onSelect}>
      <Card.Image
        height="clamp(200px, 40vw, 280px)"
        style={{
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(80px, 15vw, 120px)",
        }}
      >
        {template.preview}
      </Card.Image>

      <Card.Content style={{ padding: "clamp(16px, 4vw, 24px)" }}>
        <Card.Title style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)" }}>
          {template.name}
        </Card.Title>
        <Card.Description
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
            marginBottom: "16px",
          }}
        >
          {template.description}
        </Card.Description>
        <Card.Actions>
          <Button variant="primary" fullWidth>
            Select Template
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
};
