import { useCallback, useRef } from "react";

import { useDispatch } from "react-redux";

import { updateConfig, updateConfigLive } from "@/store/builderSlice";
import { setNestedValue } from "@helpers";

export const useFieldHandlers = () => {
  const dispatch = useDispatch();
  const onChangeHandlers = useRef(new Map());

  const shouldUseBlur = useCallback((fieldType) => {
    return (
      fieldType === "text" ||
      fieldType === "textarea" ||
      fieldType === "color" ||
      fieldType === "number" ||
      fieldType === "slider"
    );
  }, []);

  const handleFieldChange = useCallback(
    (fieldPath, value, isLiveUpdate = false) => {
      // Use thunk to access fresh state
      dispatch((dispatch, getState) => {
        const state = getState();
        const currentConfig = state.builder.currentConfig;

        // Clone the config to avoid mutations
        const newConfig = JSON.parse(JSON.stringify(currentConfig));
        setNestedValue(newConfig, fieldPath, value);

        // Use live update action for preview (no history), regular update for commits
        if (isLiveUpdate) {
          dispatch(updateConfigLive(newConfig));
        } else {
          dispatch(updateConfig(newConfig));
        }
      });
    },
    [dispatch],
  );

  const getOnChangeHandler = useCallback(
    (fieldPath, fieldType) => {
      const handlerKey = `${fieldPath}-${fieldType}`;
      if (!onChangeHandlers.current.has(handlerKey)) {
        // For text/textarea/color/number/slider, use live updates
        const useLiveUpdate = shouldUseBlur(fieldType);
        onChangeHandlers.current.set(handlerKey, (value) =>
          handleFieldChange(fieldPath, value, useLiveUpdate),
        );
      }
      return onChangeHandlers.current.get(handlerKey);
    },
    [handleFieldChange, shouldUseBlur],
  );

  const getOnBlurHandler = useCallback(
    (fieldPath) => {
      const blurKey = `${fieldPath}-blur`;
      if (!onChangeHandlers.current.has(blurKey)) {
        onChangeHandlers.current.set(
          blurKey,
          (value) => handleFieldChange(fieldPath, value, false), // Commit to history on blur
        );
      }
      return onChangeHandlers.current.get(blurKey);
    },
    [handleFieldChange],
  );

  return {
    getOnChangeHandler,
    getOnBlurHandler,
    shouldUseBlur,
  };
};
