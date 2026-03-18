import './index.scss';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Navigate,
  useNavigate,
} from 'react-router-dom';

import {
  EditorToggleButton,
  ErrorBoundary,
  HelperText,
  LoadingIndicator,
} from '@/components';
import { fetchTemplateByIdFromAPI } from '@/services';
import {
  redo,
  rehydrateTemplateComponent,
  resetToGallery,
  undo,
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

  // Check if user has seen the welcome helper before
  const [showHelperText, setShowHelperText] = useState(() => {
    try {
      const hasSeenWelcome = localStorage.getItem("hasSeenWelcomeHelper");
      return hasSeenWelcome !== "true";
    } catch (err) {
      console.error("Failed to check welcome helper status:", err);
      return true;
    }
  });

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
    let prevIsMobile = isMobile;

    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      const modeChanged = prevIsMobile !== mobile;

      setIsMobile(mobile);

      // Only reset split when switching between mobile and desktop modes
      if (modeChanged) {
        const width = window.innerWidth;
        const defaultSplit = width <= 1024 ? 60 : 100 - (350 / width) * 100;
        setSplitPercentage(defaultSplit);
        prevIsMobile = mobile;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // Handle keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing in an input/textarea
      const isInputField =
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.contentEditable === "true";

      // Don't trigger shortcuts when typing in input fields
      if (isInputField) return;

      // Ctrl+Z or Cmd+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        dispatch(undo());
      }

      // Ctrl+Y or Cmd+Y for redo (Windows/Linux)
      // Ctrl+Shift+Z or Cmd+Shift+Z for redo (Mac)
      if (
        ((e.ctrlKey || e.metaKey) && e.key === "y") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z")
      ) {
        e.preventDefault();
        dispatch(redo());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  // IMPORTANT: All hooks must be defined BEFORE any conditional returns
  const handleResize = useCallback((percentage) => {
    setSplitPercentage(percentage);
  }, []);

  const togglePanel = useCallback(() => {
    setIsPanelVisible(!isPanelVisible);
  }, [isPanelVisible]);

  const handleDismissHelper = useCallback(() => {
    setShowHelperText(false);
    try {
      localStorage.setItem("hasSeenWelcomeHelper", "true");
    } catch (err) {
      console.error("Failed to save welcome helper status:", err);
    }
  }, []);

  const orientation = isMobile ? "vertical" : "horizontal";
  const showPanel = !isMobile || isPanelVisible;

  // Memoize preview container style
  const previewStyle = useMemo(
    () => ({
      [isMobile ? "height" : "width"]:
        isMobile && !showPanel ? "100%" : `${splitPercentage}%`,
    }),
    [isMobile, showPanel, splitPercentage],
  );

  // Memoize panel container style
  const panelStyle = useMemo(
    () => ({
      [isMobile ? "height" : "width"]: `${100 - splitPercentage}%`,
    }),
    [isMobile, splitPercentage],
  );

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

  return (
    <Flex direction="column" className="editor">
      <EditorToolbar selectedTemplate={selectedTemplate} />

      <Flex className="editor__content">
        <div className="editor__preview-container" style={previewStyle}>
          <ErrorBoundary mode="component" t={t}>
            <PreviewRenderer />
          </ErrorBoundary>
        </div>

        {showPanel && (
          <>
            <ResizableDivider
              onResize={handleResize}
              orientation={orientation}
            />

            <div className="editor__panel-container" style={panelStyle}>
              <ErrorBoundary mode="component" t={t}>
                <PropertyPanel />
              </ErrorBoundary>
            </div>
          </>
        )}
      </Flex>

      {isMobile && (
        <EditorToggleButton
          isPanelVisible={isPanelVisible}
          onClick={togglePanel}
        />
      )}

      <HelperText show={showHelperText} onDismiss={handleDismissHelper} />
    </Flex>
  );
};
