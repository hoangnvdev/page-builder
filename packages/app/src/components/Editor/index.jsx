import './index.scss';

import {
  useEffect,
  useState,
} from 'react';

import { FilePenLine } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Navigate,
  useNavigate,
} from 'react-router-dom';

import { LoadingIndicator } from '@/components';
import { fetchTemplateByIdFromAPI } from '@/services';
import {
  rehydrateTemplateComponent,
  resetToGallery,
} from '@/store/builderSlice';
import { processTemplateConfig } from '@/utils';
import { Flex } from '@page-builder/ui';

import { EditorToolbar } from '../EditorToolbar';
import { PreviewRenderer } from '../PreviewRenderer';
import { PropertyPanel } from '../PropertyPanel';
import { ResizableDivider } from '../ResizableDivider';

export const Editor = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const [isRehydrating, setIsRehydrating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  const getDefaultSplit = () => {
    const width = window.innerWidth;
    if (width <= 1024) return 60;

    return 100 - (350 / width) * 100;
  };
  const [splitPercentage, setSplitPercentage] = useState(getDefaultSplit());

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

  // Handle window resize to adjust orientation
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      // Reset split when switching between mobile and desktop
      const width = window.innerWidth;
      const defaultSplit = width <= 1024 ? 60 : 100 - (350 / width) * 100;
      setSplitPercentage(defaultSplit);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!selectedTemplate) {
    return <Navigate to="/template" replace />;
  }

  if (isRehydrating) {
    return (
      <LoadingIndicator
        title={t("editor.loading.title")}
        description={t("editor.loading.description")}
      />
    );
  }

  const handleResize = (percentage) => {
    setSplitPercentage(percentage);
  };

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const orientation = isMobile ? "vertical" : "horizontal";
  const showPanel = !isMobile || isPanelVisible;

  return (
    <Flex direction="column" className="editor">
      <EditorToolbar selectedTemplate={selectedTemplate} />

      <Flex className="editor__content">
        <div
          className="editor__preview-container"
          style={{
            [isMobile ? "height" : "width"]:
              isMobile && !showPanel ? "100%" : `${splitPercentage}%`,
          }}
        >
          <PreviewRenderer />
        </div>

        {showPanel && (
          <>
            <ResizableDivider
              onResize={handleResize}
              orientation={orientation}
            />

            <div
              className="editor__panel-container"
              style={{
                [isMobile ? "height" : "width"]: `${100 - splitPercentage}%`,
              }}
            >
              <PropertyPanel />
            </div>
          </>
        )}
      </Flex>

      {isMobile && (
        <button
          className="editor__toggle-panel"
          onClick={togglePanel}
          aria-label={
            isPanelVisible
              ? t("editor.accessibility.closePanel")
              : t("editor.accessibility.openPanel")
          }
        >
          <span className="editor__toggle-tooltip">
            {isPanelVisible
              ? t("editor.accessibility.closePanel")
              : t("editor.accessibility.openPanel")}
          </span>
          <FilePenLine size={24} />
        </button>
      )}
    </Flex>
  );
};
