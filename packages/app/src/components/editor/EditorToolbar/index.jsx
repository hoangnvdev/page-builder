import './index.scss';

import { useCallback } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useConfirmDialog } from '@/hooks';
import { resetToGallery } from '@/store/builderSlice';

import { AppButton } from '../../common/AppButton';
import { ConfirmDialog } from '../../common/ConfirmDialog';
import { Divider } from '../../common/Divider';
import { LanguageSwitcher } from '../../i18n/LanguageSwitcher';
import { Toolbar } from '../../layout/Toolbar';
import { Title } from '../../typography/Title';
import { ExportButton } from '../ExportButton';

export const EditorToolbar = ({ selectedTemplate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, config, showConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();

  const hasHistory = useSelector(
    (state) =>
      (state.builder.history?.past?.length || 0) > 0 ||
      (state.builder.history?.future?.length || 0) > 0,
  );

  const handleBackClick = useCallback(() => {
    if (hasHistory) {
      showConfirm({
        title: t("confirmDialog.backTitle"),
        message: t("confirmDialog.backMessage"),
        confirmText: t("confirmDialog.backConfirm"),
        variant: "warning",
        onConfirm: () => {
          dispatch(resetToGallery());
          navigate("/template");
        },
      });
    } else {
      dispatch(resetToGallery());
      navigate("/template");
    }
  }, [hasHistory, dispatch, navigate, showConfirm, t]);

  return (
    <Toolbar className="editor-toolbar">
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
      <Toolbar.Left>
        <AppButton
          variant="ghost"
          onClick={handleBackClick}
          className="editor-toolbar__back-button"
        >
          <ArrowLeft size={16} />
          <span className="editor-toolbar__back-button-text">
            {t("editor.toolbar.backButton")}
          </span>
        </AppButton>
        <Divider orientation="vertical" spacing={0} />
        <Title level={2} className="editor-toolbar__title">
          {selectedTemplate.name}
        </Title>
        <LanguageSwitcher compact />
      </Toolbar.Left>

      <Toolbar.Right>
        <LanguageSwitcher />
        <Divider orientation="vertical" spacing={0} />
        <ExportButton />
      </Toolbar.Right>
    </Toolbar>
  );
};
