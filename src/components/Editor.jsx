import { useDispatch, useSelector } from "react-redux";

import { Button, Divider, Flex, Toolbar } from "../common";
import { resetCurrentConfig, resetToGallery } from "../store/builderSlice";
import { ExportButton } from "./ExportButton";
import { PreviewRenderer } from "./PreviewRenderer";
import { PropertyPanel } from "./PropertyPanel";

export const Editor = () => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );

  if (!selectedTemplate) {
    return null;
  }

  const handleResetToGallery = () => dispatch(resetToGallery());
  const handleResetCurrentConfig = () => dispatch(resetCurrentConfig());

  return (
    <Flex direction="column" style={{ height: "100vh" }}>
      {/* Top Toolbar */}
      <Toolbar style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <Toolbar.Left>
          <Button
            variant="ghost"
            onClick={handleResetToGallery}
            style={{ fontSize: "1rem" }}
          >
            ← Back to Templates
          </Button>
          <Divider orientation="vertical" spacing={0} />
          <h2
            style={{
              margin: 0,
              fontSize: "1.1rem",
              color: "#1a1a1a",
              fontWeight: "600",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {selectedTemplate.name}
          </h2>
        </Toolbar.Left>

        <Toolbar.Right>
          <Button variant="secondary" onClick={handleResetCurrentConfig}>
            Reset to Default
          </Button>
          <ExportButton />
        </Toolbar.Right>
      </Toolbar>

      {/* Main Editor Area */}
      <Flex style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <PreviewRenderer />
        <PropertyPanel />
      </Flex>
    </Flex>
  );
};
