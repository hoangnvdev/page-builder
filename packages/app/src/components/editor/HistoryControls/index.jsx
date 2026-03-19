import "./index.scss";

import { memo, useCallback, useEffect, useRef, useState } from "react";

import {
  ChevronDown,
  CornerUpLeft,
  CornerUpRight,
  History,
  RotateCcw,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useEditor, useModal } from "@/contexts";
import { resetCurrentConfig } from "@/store/builderSlice";

export const HistoryControls = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);
  const currentStateRef = useRef(null);

  // Use new contexts
  const { openConfirmDialog } = useModal();
  const { history, canUndo, canRedo, undo, redo } = useEditor();

  const historyPastLength = history?.past?.length || 0;
  const historyFutureLength = history?.future?.length || 0;

  const historyData = showHistory
    ? history || { past: [], future: [] }
    : { past: [], future: [] };

  useEffect(() => {
    if (showHistory && currentStateRef.current) {
      currentStateRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [showHistory, historyPastLength, historyFutureLength]);

  const handleUndo = useCallback(() => {
    undo();
  }, [undo]);

  const handleRedo = useCallback(() => {
    redo();
  }, [redo]);

  const handleResetClick = useCallback(async () => {
    if (historyPastLength > 0 || historyFutureLength > 0) {
      const confirmed = await openConfirmDialog({
        title: t("confirmDialog.resetTitle"),
        message: t("confirmDialog.resetMessage"),
        confirmText: t("confirmDialog.resetConfirm"),
        variant: "danger",
      });

      if (confirmed) {
        dispatch(resetCurrentConfig());
        setShowHistory(false);
      }
    }
  }, [historyPastLength, historyFutureLength, openConfirmDialog, t, dispatch]);

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
      {showHistory &&
        (historyData.past.length > 0 || historyData.future.length > 0) && (
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
              {historyData.future.length > 0 && (
                <div className="history-controls__section">
                  {[...historyData.future].reverse().map((config, index) => (
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

              {historyData.past.length > 0 && (
                <div className="history-controls__section">
                  {[...historyData.past]
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
                            historyData.past.length - 1 - index,
                            "past",
                          )}
                        </span>
                      </div>
                    ))}
                  {historyData.past.length > 10 && (
                    <div className="history-controls__item history-controls__item--more">
                      ... {historyData.past.length - 10}{" "}
                      {t("historyControls.moreChanges")}
                    </div>
                  )}
                </div>
              )}
            </div>

            {(historyData.past.length > 0 || historyData.future.length > 0) && (
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
