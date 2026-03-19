import "./index.scss";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  UNSAFE_NavigationContext,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  EditorToggleButton,
  ErrorBoundary,
  HelperText,
  LoadingIndicator,
} from "@/components";
import { useConfirmDialog, useLocalStorage, useWindowResize } from "@/hooks";
import { fetchTemplateByIdFromAPI } from "@/services";
import {
  redo,
  rehydrateTemplateComponent,
  resetToGallery,
  undo,
} from "@/store/builderSlice";
import { processTemplateConfig } from "@/utils";

import { ConfirmDialog } from "../../common/ConfirmDialog";
import { Flex } from "../../layout/Flex";
import { ResizableDivider } from "../../layout/ResizableDivider";
import { EditorToolbar } from "../EditorToolbar";
import { PreviewRenderer } from "../PreviewRenderer";
import { PropertyPanel } from "../PropertyPanel";

export const Editor = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationContext = useContext(UNSAFE_NavigationContext);

  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const { isOpen, config, showConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();

  const hasHistory = useSelector(
    (state) =>
      (state.builder.history?.past?.length || 0) > 0 ||
      (state.builder.history?.future?.length || 0) > 0,
  );

  const [isRehydrating, setIsRehydrating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const pendingNavigationRef = useRef(null);
  const isHandlingPopStateRef = useRef(false);
  const hasSetupHistoryEntryRef = useRef(false);

  const [showHelperText, setShowHelperText] = useLocalStorage(
    "hasSeenWelcomeHelper",
    false,
    {
      serializer: (value) => (!value).toString(),
      deserializer: (value) => value !== "true",
    },
  );

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

  // Intercept navigation when there are unsaved changes
  useEffect(() => {
    if (!navigationContext || !hasHistory) return;

    const originalPush = navigationContext.navigator.push;
    const originalReplace = navigationContext.navigator.replace;
    const originalGo = navigationContext.navigator.go;

    navigationContext.navigator.push = function (to, state) {
      if (
        hasHistory &&
        location.pathname !== (typeof to === "string" ? to : to.pathname)
      ) {
        pendingNavigationRef.current = { method: "push", to, state };
        showConfirm({
          title: t("confirmDialog.backTitle"),
          message: t("confirmDialog.backMessage"),
          confirmText: t("confirmDialog.backConfirm"),
          cancelText: t("confirmDialog.cancel"),
          variant: "warning",
          onConfirm: () => {
            dispatch(resetToGallery());
            originalPush.call(navigationContext.navigator, to, state);
            pendingNavigationRef.current = null;
          },
        });
      } else {
        originalPush.call(navigationContext.navigator, to, state);
      }
    };

    navigationContext.navigator.replace = function (to, state) {
      if (
        hasHistory &&
        location.pathname !== (typeof to === "string" ? to : to.pathname)
      ) {
        pendingNavigationRef.current = { method: "replace", to, state };
        showConfirm({
          title: t("confirmDialog.backTitle"),
          message: t("confirmDialog.backMessage"),
          confirmText: t("confirmDialog.backConfirm"),
          cancelText: t("confirmDialog.cancel"),
          variant: "warning",
          onConfirm: () => {
            dispatch(resetToGallery());
            originalReplace.call(navigationContext.navigator, to, state);
            pendingNavigationRef.current = null;
          },
        });
      } else {
        originalReplace.call(navigationContext.navigator, to, state);
      }
    };

    navigationContext.navigator.go = function (delta) {
      if (hasHistory) {
        pendingNavigationRef.current = { method: "go", delta };
        showConfirm({
          title: t("confirmDialog.backTitle"),
          message: t("confirmDialog.backMessage"),
          confirmText: t("confirmDialog.backConfirm"),
          cancelText: t("confirmDialog.cancel"),
          variant: "warning",
          onConfirm: () => {
            dispatch(resetToGallery());
            originalGo.call(navigationContext.navigator, delta);
            pendingNavigationRef.current = null;
          },
        });
      } else {
        originalGo.call(navigationContext.navigator, delta);
      }
    };

    return () => {
      navigationContext.navigator.push = originalPush;
      navigationContext.navigator.replace = originalReplace;
      navigationContext.navigator.go = originalGo;
    };
  }, [
    navigationContext,
    hasHistory,
    location.pathname,
    showConfirm,
    t,
    dispatch,
  ]);

  // Handle browser back/forward buttons (including mouse buttons)
  useEffect(() => {
    const handlePopState = (event) => {
      if (isHandlingPopStateRef.current) return;

      if (hasHistory) {
        // Prevent the navigation by pushing back to current location
        isHandlingPopStateRef.current = true;
        window.history.pushState(null, "", location.pathname + location.search);

        showConfirm({
          title: t("confirmDialog.backTitle"),
          message: t("confirmDialog.backMessage"),
          confirmText: t("confirmDialog.backConfirm"),
          cancelText: t("confirmDialog.cancel"),
          variant: "warning",
          onConfirm: () => {
            dispatch(resetToGallery());
            isHandlingPopStateRef.current = false;
            hasSetupHistoryEntryRef.current = false;
            // Use React Router navigate instead of window.history.back()
            navigate("/template", { replace: true });
          },
          onCancel: () => {
            isHandlingPopStateRef.current = false;
          },
        });
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Push initial state to enable back button interception
    // Only push once when hasHistory becomes true
    if (hasHistory && !hasSetupHistoryEntryRef.current) {
      window.history.pushState(null, "", location.pathname + location.search);
      hasSetupHistoryEntryRef.current = true;
    } else if (!hasHistory) {
      // Reset when history is cleared
      hasSetupHistoryEntryRef.current = false;
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [
    hasHistory,
    location.pathname,
    location.search,
    showConfirm,
    t,
    dispatch,
    navigate,
  ]);

  // Handle cancel from confirmation dialog
  useEffect(() => {
    if (!isOpen && pendingNavigationRef.current) {
      pendingNavigationRef.current = null;
    }
  }, [isOpen]);

  // Note: beforeunload handler removed - Redux Persist automatically saves state,
  // so F5/refresh is safe and won't lose user's work

  // Handle window resize to adjust orientation
  useWindowResize(() => {
    const mobile = window.innerWidth <= 1024;
    const modeChanged = isMobile !== mobile;

    setIsMobile(mobile);

    if (modeChanged) {
      const width = window.innerWidth;
      const defaultSplit = width <= 1024 ? 60 : 100 - (350 / width) * 100;
      setSplitPercentage(defaultSplit);
    }
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
  }, [setShowHelperText]);

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
      <ConfirmDialog
        isOpen={isOpen}
        title={config.title}
        message={config.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText={config.confirmText}
        cancelText={config.cancelText}
        variant={config.variant}
      />
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
