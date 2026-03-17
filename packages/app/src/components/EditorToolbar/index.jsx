import "./index.scss";

import { useCallback } from "react";

import { ArrowLeft, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetCurrentConfig, resetToGallery } from "@/store/builderSlice";
import { Divider, Title, Toolbar } from "@page-builder/ui";

import { AppButton } from "../AppButton";
import { ExportButton } from "../ExportButton";
import { LanguageSwitcher } from "../LanguageSwitcher";

export const EditorToolbar = ({ selectedTemplate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetToGallery = useCallback(() => {
    dispatch(resetToGallery());
    navigate("/template");
  }, [dispatch, navigate]);

  const handleResetCurrentConfig = useCallback(() => {
    dispatch(resetCurrentConfig());
  }, [dispatch]);

  return (
    <Toolbar className="editor-toolbar">
      <Toolbar.Left>
        <AppButton
          variant="ghost"
          onClick={handleResetToGallery}
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
        <AppButton variant="secondary" onClick={handleResetCurrentConfig}>
          <RotateCcw size={16} />
          {t("editor.toolbar.resetButton")}
        </AppButton>
        <ExportButton />
      </Toolbar.Right>
    </Toolbar>
  );
};
