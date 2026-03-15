import "./index.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetCurrentConfig, resetToGallery } from "@/store/builderSlice";
import { Button, Divider, Title, Toolbar } from "@page-builder/ui";

import { ExportButton } from "../ExportButton";

export const EditorToolbar = ({ selectedTemplate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetToGallery = () => {
    dispatch(resetToGallery());
    navigate("/template");
  };

  const handleResetCurrentConfig = () => dispatch(resetCurrentConfig());

  return (
    <Toolbar className="editor-toolbar">
      <Toolbar.Left>
        <Button
          variant="ghost"
          onClick={handleResetToGallery}
          className="editor-toolbar__back-button"
        >
          ← Back to Templates
        </Button>
        <Divider orientation="vertical" spacing={0} />
        <Title level={2} className="editor-toolbar__title">
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
  );
};
