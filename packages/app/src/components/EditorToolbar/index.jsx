import "./index.scss";

import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetCurrentConfig, resetToGallery } from "@/store/builderSlice";
import { Button, Divider, Title, Toolbar } from "@page-builder/ui";

import { ExportButton } from "../ExportButton";
import { LanguageSwitcher } from "../LanguageSwitcher";

export const EditorToolbar = ({ selectedTemplate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetToGallery = () => {
    dispatch(resetToGallery());
    navigate("/template");
  };

  const handleResetCurrentConfig = () => dispatch(resetCurrentConfig());

  return (
    <Toolbar className="editor-toolbar">
      <Toolbar.Left>
        <Button
          variant="ghost"
          onClick={handleResetToGallery}
          className="editor-toolbar__back-button"
        >
          <ArrowLeft size={16} />
          {t("editor.toolbar.backButton")}
        </Button>
        <Divider orientation="vertical" spacing={0} />
        <Title level={2} className="editor-toolbar__title">
          {selectedTemplate.name}
        </Title>
      </Toolbar.Left>

      <Toolbar.Right>
        <LanguageSwitcher />
        <Divider orientation="vertical" spacing={0} />
        <Button variant="secondary" onClick={handleResetCurrentConfig}>
          {t("editor.toolbar.resetButton")}
        </Button>
        <ExportButton />
      </Toolbar.Right>
    </Toolbar>
  );
};
