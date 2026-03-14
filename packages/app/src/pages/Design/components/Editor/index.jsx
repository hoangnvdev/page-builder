import "./index.scss";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { LoadingIndicator } from "@/components";
import { fetchTemplateByIdFromAPI } from "@/services";
import {
  resetCurrentConfig,
  resetToGallery,
  selectTemplate,
} from "@/store/builderSlice";
import { processTemplateConfig } from "@/utils";
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
  const [isRehydrating, setIsRehydrating] = useState(false);

  // Re-hydrate template component if missing (after page refresh)
  useEffect(() => {
    const rehydrateTemplate = async () => {
      if (selectedTemplate && !selectedTemplate.component) {
        try {
          setIsRehydrating(true);
          const templateData = await fetchTemplateByIdFromAPI(
            selectedTemplate.id,
          );
          const processedTemplate = processTemplateConfig(templateData);
          dispatch(selectTemplate(processedTemplate));
        } catch (err) {
          console.error("Failed to rehydrate template:", err);
          dispatch(resetToGallery());
          navigate("/template");
        } finally {
          setIsRehydrating(false);
        }
      }
    };

    rehydrateTemplate();
  }, [selectedTemplate, dispatch, navigate]);

  if (!selectedTemplate) {
    return <Navigate to="/template" replace />;
  }

  if (isRehydrating) {
    return (
      <LoadingIndicator
        title="Restoring Template..."
        description="Please wait while we restore your design..."
      />
    );
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
