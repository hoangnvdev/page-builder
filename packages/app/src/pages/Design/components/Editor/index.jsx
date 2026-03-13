import "./index.scss";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { resetCurrentConfig, resetToGallery } from "@/store/builderSlice";
import { Button, Divider, Flex, Title, Toolbar } from "@page-builder/ui";

import { ExportButton } from "../ExportButton";
import { PreviewRenderer } from "../PreviewRenderer";
import { PropertyPanel } from "../PropertyPanel";

export const Editor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );

  if (!selectedTemplate) {
    return <Navigate to="/template" replace />;
  }

  const handleResetToGallery = () => {
    dispatch(resetToGallery());
    navigate("/template");
  };

  const handleResetCurrentConfig = () => dispatch(resetCurrentConfig());

  return (
    <Flex direction="column" className="editor">
      {/* Top Toolbar  */}
      <Toolbar className="editor__toolbar">
        <Toolbar.Left>
          <Button
            variant="ghost"
            onClick={handleResetToGallery}
            className="editor__back-button"
          >
            ← Back to Templates
          </Button>
          <Divider orientation="vertical" spacing={0} />
          <Title level={2} className="editor__title">
            {selectedTemplate.name}
          </Title>
        </Toolbar.Left>

        <Toolbar.Right>
          <Button variant="secondary" onClick={handleResetCurrentConfig}>
            Reset to Default
          </Button>
          <ExportButton />
        </Toolbar.Right>
      </Toolbar>

      {/* Main Editor Area */}
      <Flex className="editor__content">
        <PreviewRenderer />
        <PropertyPanel />
      </Flex>
    </Flex>
  );
};
