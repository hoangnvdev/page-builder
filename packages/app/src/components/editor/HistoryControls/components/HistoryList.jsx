import {
  memo,
  useEffect,
  useRef,
} from 'react';

import {
  ArrowDownToLine,
  ArrowUpToLine,
  ChevronDown,
  Eraser,
  History,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { AppButton } from '@/components';

import { HistoryItem } from './HistoryItem';

export const HistoryList = memo(
  ({ history, historyPastLength, historyFutureLength, onClose, onReset }) => {
    const { t } = useTranslation();
    const currentStateRef = useRef(null);

    useEffect(() => {
      if (currentStateRef.current) {
        currentStateRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, [historyPastLength, historyFutureLength]);

    const hasHistory = historyPastLength > 0 || historyFutureLength > 0;

    if (!hasHistory) return null;

    return (
      <div className="history-controls__list">
        <div className="history-controls__list-header">
          <History size={14} />
          <span>{t("historyControls.historyTitle")}</span>
          <button
            className="history-controls__close"
            onClick={onClose}
            aria-label={t("historyControls.close")}
          >
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="history-controls__helper">
          <ArrowUpToLine size={14} />
          {t("historyControls.helperText")}
          <ArrowDownToLine size={14} />
        </div>

        <div className="history-controls__list-content">
          {/* Future actions (redo available) - latest changes */}
          {[...history.future].reverse().map((entry, index) => {
            const key = entry.id || `future-${index}`;
            const changeNumber =
              history.past.length + history.future.length - index;
            return (
              <HistoryItem
                key={key}
                label={`Change #${changeNumber}`}
                type="future"
              />
            );
          })}

          {/* Current state marker */}
          <div className="history-controls__current" ref={currentStateRef}>
            <div className="history-controls__current-marker" />
            <span>{t("historyControls.currentState")}</span>
            <span className="history-controls__you-are-here">
              ({t("historyControls.youAreHere")})
            </span>
          </div>

          {/* Past actions (undo available) - older changes */}
          {[...history.past].reverse().map((entry, index) => {
            const key = entry.id || `past-${history.past.length - 1 - index}`;
            const changeNumber = history.past.length - index;
            return (
              <HistoryItem
                key={key}
                label={`Change #${changeNumber}`}
                type="past"
              />
            );
          })}
        </div>

        {hasHistory && (
          <div className="history-controls__reset-section">
            <AppButton
              variant="danger"
              size="small"
              icon={<Eraser size={16} />}
              onClick={onReset}
              fullWidth
            >
              {t("historyControls.resetButton")}
            </AppButton>
          </div>
        )}
      </div>
    );
  },
);

HistoryList.displayName = "HistoryList";

HistoryList.propTypes = {
  history: PropTypes.shape({
    past: PropTypes.array,
    future: PropTypes.array,
  }).isRequired,
  historyPastLength: PropTypes.number.isRequired,
  historyFutureLength: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
