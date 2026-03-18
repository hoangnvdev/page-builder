import './index.scss';

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ChevronDown,
  CornerUpLeft,
  CornerUpRight,
  History,
  RotateCcw,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { useConfirmDialog } from '@/hooks';
import {
  redo,
  resetCurrentConfig,
  undo,
} from '@/store/builderSlice';

import { ConfirmDialog } from '../../common/ConfirmDialog';

export const HistoryControls = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);
  const { isOpen, config, showConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();
  const currentStateRef = useRef(null);

  // Only select the lengths to minimize re-renders
  const historyPastLength = useSelector(
    (state) => state.builder.history?.past?.length || 0,
  );
  const historyFutureLength = useSelector(
    (state) => state.builder.history?.future?.length || 0,
  );

  const canUndo = historyPastLength > 0;
  const canRedo = historyFutureLength > 0;

  const history = useSelector((state) =>
    showHistory
      ? state.builder.history || { past: [], future: [] }
      : { past: [], future: [] },
  );

  useEffect(() => {
    if (showHistory && currentStateRef.current) {
      currentStateRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [showHistory, historyPastLength, historyFutureLength]);

  const handleUndo = useCallback(() => {
    dispatch(undo());
  }, [dispatch]);

  const handleRedo = useCallback(() => {
    dispatch(redo());
  }, [dispatch]);

  const handleResetClick = useCallback(() => {
    if (historyPastLength > 0 || historyFutureLength > 0) {
      showConfirm({
        title: t("confirmDialog.resetTitle"),
        message: t("confirmDialog.resetMessage"),
        confirmText: t("confirmDialog.resetConfirm"),
        variant: "danger",
        onConfirm: () => {
          dispatch(resetCurrentConfig());
          setShowHistory(false);
        },
      });
    }
  }, [historyPastLength, historyFutureLength, showConfirm, t, dispatch]);

  const toggleHistory = useCallback(() => {
    setShowHistory((prev) => !prev);
  }, []);

  const getChangePreview = useCallback(
    (config, index, type) => {
      if (!config) return t("historyControls.unknownChange");

      const changeNumber = index + 1;

      return `${t("historyControls.change")} #${changeNumber}`;
    },
    [t],
  );

  return (
    <div className="history-controls">
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
      {showHistory &&
        (history.past.length > 0 || history.future.length > 0) && (
          <div className="history-controls__list">
            <div className="history-controls__list-header">
              <History size={14} />
              <span>{t("historyControls.historyTitle")}</span>
              <button
                className="history-controls__close"
                onClick={toggleHistory}
                aria-label={t("historyControls.close")}
              >
                <ChevronDown size={16} />
              </button>
            </div>
            <div className="history-controls__helper">
              {t("historyControls.helperText")}
            </div>
            <div className="history-controls__list-content">
              {history.future.length > 0 && (
                <div className="history-controls__section">
                  {[...history.future].reverse().map((config, index) => (
                    <div
                      key={`future-${index}`}
                      className="history-controls__item history-controls__item--future"
                    >
                      <CornerUpRight size={12} />
                      <span>{getChangePreview(config, index, "future")}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="history-controls__current" ref={currentStateRef}>
                <div className="history-controls__current-marker"></div>
                <span>{t("historyControls.currentState")}</span>
                <span className="history-controls__you-are-here">
                  ({t("historyControls.youAreHere")})
                </span>
              </div>

              {history.past.length > 0 && (
                <div className="history-controls__section">
                  {[...history.past]
                    .reverse()
                    .slice(0, 10)
                    .map((config, index) => (
                      <div
                        key={`past-${index}`}
                        className="history-controls__item history-controls__item--past"
                      >
                        <CornerUpLeft size={12} />
                        <span>
                          {getChangePreview(
                            config,
                            history.past.length - 1 - index,
                            "past",
                          )}
                        </span>
                      </div>
                    ))}
                  {history.past.length > 10 && (
                    <div className="history-controls__item history-controls__item--more">
                      ... {history.past.length - 10}{" "}
                      {t("historyControls.moreChanges")}
                    </div>
                  )}
                </div>
              )}
            </div>

            {(history.past.length > 0 || history.future.length > 0) && (
              <div className="history-controls__reset-section">
                <button
                  className="history-controls__reset-button"
                  onClick={handleResetClick}
                  title={t("historyControls.resetButton")}
                >
                  <RotateCcw size={16} />
                  <span>{t("historyControls.resetButton")}</span>
                </button>
              </div>
            )}
          </div>
        )}

      <div className="history-controls__buttons">
        <button
          className="history-controls__button"
          onClick={handleUndo}
          disabled={!canUndo}
          title={t("editor.toolbar.undoButton")}
        >
          <CornerUpLeft size={18} />
          <span className="history-controls__button-text">
            {t("editor.toolbar.undoButton")}
          </span>
        </button>

        <button
          className="history-controls__button history-controls__button--history"
          onClick={toggleHistory}
          disabled={!canUndo && !canRedo}
          title={t("historyControls.showHistory")}
        >
          <History size={18} />
          <span className="history-controls__button-text">
            {t("historyControls.historyTitle")}
          </span>
          <span className="history-controls__button-count">
            {historyPastLength + historyFutureLength}
          </span>
        </button>

        <button
          className="history-controls__button"
          onClick={handleRedo}
          disabled={!canRedo}
          title={t("editor.toolbar.redoButton")}
        >
          <CornerUpRight size={18} />
          <span className="history-controls__button-text">
            {t("editor.toolbar.redoButton")}
          </span>
        </button>
      </div>
    </div>
  );
});

HistoryControls.displayName = "HistoryControls";
