import { createContext, useContext, useMemo } from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  redo,
  resetCurrentConfig,
  selectTemplate,
  undo,
  updateConfig,
  updateElementConfig,
  updatePageConfig,
} from "@/store/builderSlice";

const EditorContext = createContext(undefined);

export const EditorProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Select commonly used Redux state
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);
  const history = useSelector((state) => state.builder.history);

  // Derived state - builder slice doesn't have components array or selectedComponentId
  // Using history for undo/redo capability
  const canUndo = history?.past?.length > 0;
  const canRedo = history?.future?.length > 0;

  // Action dispatchers
  const actions = useMemo(
    () => ({
      // Template actions
      selectTemplate: (template) => dispatch(selectTemplate(template)),
      updateConfig: (config) => dispatch(updateConfig(config)),
      updatePageConfig: (pageConfig) => dispatch(updatePageConfig(pageConfig)),
      updateElementConfig: (elementId, updates) =>
        dispatch(updateElementConfig({ elementId, updates })),

      // History actions
      undo: () => dispatch(undo()),
      redo: () => dispatch(redo()),
      resetCurrentConfig: () => dispatch(resetCurrentConfig()),
    }),
    [dispatch],
  );

  const value = useMemo(
    () => ({
      // State
      selectedTemplate,
      currentConfig,
      history,
      canUndo,
      canRedo,

      // Actions
      ...actions,
    }),
    [selectedTemplate, currentConfig, history, canUndo, canRedo, actions],
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

EditorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
};
