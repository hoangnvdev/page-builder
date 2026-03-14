import "./index.scss";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { LoadingIndicator } from "@/components";
import { fetchTemplateByIdFromAPI } from "@/services";
import {
  rehydrateTemplateComponent,
  resetToGallery,
} from "@/store/builderSlice";
import { processTemplateConfig } from "@/utils";
import { Flex } from "@page-builder/ui";

import { EditorToolbar } from "../EditorToolbar";
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

          dispatch(rehydrateTemplateComponent(processedTemplate));
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

  return (
    <Flex direction="column" className="editor">
      <EditorToolbar selectedTemplate={selectedTemplate} />

      {/* Main Editor Area */}
      <Flex className="editor__content">
        <PreviewRenderer />
        <PropertyPanel />
      </Flex>
    </Flex>
  );
};
