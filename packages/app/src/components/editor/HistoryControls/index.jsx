import './index.scss';

import {
  memo,
  useCallback,
  useState,
} from 'react';

import {
  CornerUpLeft,
  CornerUpRight,
  History,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AppButton } from '@/components';
import {
  useEditor,
  useModal,
} from '@/contexts';
import { resetCurrentConfig } from '@/store/builderSlice';

import { HistoryList } from './components';

export const HistoryControls = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);

  // Use contexts
  const { openConfirmDialog } = useModal();
  const { history, canUndo, canRedo, undo, redo } = useEditor();

  const historyPastLength = history?.past?.length || 0;
  const historyFutureLength = history?.future?.length || 0;
  const historyData = history || { past: [], future: [] };

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

  return (
    <div className="history-controls">
      {showHistory && (
        <HistoryList
          history={historyData}
          historyPastLength={historyPastLength}
          historyFutureLength={historyFutureLength}
          onClose={toggleHistory}
          onReset={handleResetClick}
        />
      )}

      <div className="history-controls__buttons">
        <AppButton
          variant="ghost"
          size="medium"
          icon={<CornerUpLeft size={18} />}
          onClick={handleUndo}
          disabled={!canUndo}
          title={t("editor.toolbar.undoButton")}
        >
          <span className="history-controls__button-text">
            {t("editor.toolbar.undoButton")}
          </span>
        </AppButton>

        <div className="history-controls__button-wrapper">
          <AppButton
            variant="ghost"
            size="medium"
            icon={<History size={18} />}
            onClick={toggleHistory}
            disabled={!canUndo && !canRedo}
            title={t("historyControls.showHistory")}
            className="history-controls__button--history"
          >
            <span className="history-controls__button-text">
              {t("historyControls.historyTitle")}
            </span>
          </AppButton>
          {historyPastLength + historyFutureLength > 0 && (
            <span className="history-controls__button-count">
              {historyPastLength + historyFutureLength}
            </span>
          )}
        </div>

        <AppButton
          variant="ghost"
          size="medium"
          icon={<CornerUpRight size={18} />}
          onClick={handleRedo}
          disabled={!canRedo}
          title={t("editor.toolbar.redoButton")}
        >
          <span className="history-controls__button-text">
            {t("editor.toolbar.redoButton")}
          </span>
        </AppButton>
      </div>
    </div>
  );
});

HistoryControls.displayName = "HistoryControls";
