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
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  redo,
  undo,
} from '@/store/builderSlice';

export const HistoryControls = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);
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

  // Only fetch full history when showing the popup (memoized to prevent re-renders)
  const history = useSelector((state) =>
    showHistory
      ? state.builder.history || { past: [], future: [] }
      : { past: [], future: [] },
  );

  // Scroll current state into view when history changes
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

  const toggleHistory = useCallback(() => {
    setShowHistory((prev) => !prev);
  }, []);

  // Get a preview of the change for history list
  const getChangePreview = (config, index, type) => {
    if (!config) return t("historyControls.unknownChange");

    // Try to detect what changed by comparing with next/previous
    // Simple approach: show timestamp or change number
    const changeNumber =
      type === "past" ? history.past.length - index : index + 1;
    return `${t("historyControls.change")} #${changeNumber}`;
  };

  return (
    <div className="history-controls">
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
              {/* Future changes (redo) */}
              {history.future.length > 0 && (
                <div className="history-controls__section">
                  <div className="history-controls__section-title">
                    {t("historyControls.future")} ({history.future.length})
                  </div>
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

              {/* Current state indicator */}
              <div className="history-controls__current" ref={currentStateRef}>
                <div className="history-controls__current-marker"></div>
                <span>{t("historyControls.currentState")}</span>
                <span className="history-controls__you-are-here">
                  ({t("historyControls.youAreHere")})
                </span>
              </div>

              {/* Past changes (undo) */}
              {history.past.length > 0 && (
                <div className="history-controls__section">
                  <div className="history-controls__section-title">
                    {t("historyControls.past")} ({history.past.length})
                  </div>
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
