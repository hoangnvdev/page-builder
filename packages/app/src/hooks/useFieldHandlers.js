import {
  useCallback,
  useRef,
} from 'react';

import { useDispatch } from 'react-redux';

import {
  updateConfig,
  updateConfigLive,
} from '@/store/builderSlice';
import { setNestedValue } from '@/utils';

export const useFieldHandlers = () => {
  const dispatch = useDispatch();
  const onChangeHandlers = useRef(new Map());

  const shouldUseBlur = useCallback((fieldType) => {
    return (
      fieldType === "text" ||
      fieldType === "textarea" ||
      fieldType === "color" ||
      fieldType === "number"
    );
  }, []);

  const shouldUseChangeEnd = useCallback((fieldType) => {
    return fieldType === "slider";
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
        // For text/textarea/color/number, use live updates (commit on blur)
        // For slider, use live updates (commit on changeEnd)
        const useLiveUpdate =
          shouldUseBlur(fieldType) || shouldUseChangeEnd(fieldType);
        onChangeHandlers.current.set(handlerKey, (value) =>
          handleFieldChange(fieldPath, value, useLiveUpdate),
        );
      }
      return onChangeHandlers.current.get(handlerKey);
    },
    [handleFieldChange, shouldUseBlur, shouldUseChangeEnd],
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

  const getOnChangeEndHandler = useCallback(
    (fieldPath) => {
      const changeEndKey = `${fieldPath}-changeEnd`;
      if (!onChangeHandlers.current.has(changeEndKey)) {
        onChangeHandlers.current.set(
          changeEndKey,
          (value) => handleFieldChange(fieldPath, value, false), // Commit to history on change end
        );
      }
      return onChangeHandlers.current.get(changeEndKey);
    },
    [handleFieldChange],
  );

  return {
    getOnChangeHandler,
    getOnBlurHandler,
    getOnChangeEndHandler,
    shouldUseBlur,
    shouldUseChangeEnd,
  };
};
