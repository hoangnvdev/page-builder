import './index.scss';

import {
  memo,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useSelection } from '@/contexts/SelectionContext';
import {
  useFieldHandlers,
  useScrollToTopOnSelection,
} from '@/hooks';
import { deepMerge } from '@/utils';
import {
  enhanceFieldOptions as enhanceOptions,
  normalizeFieldValue,
  resolveFieldValue,
  shouldShowField as checkFieldVisibility,
} from '@/utils/propertyPanel';
import {
  getFieldsForElement,
  getSingularTemplateName,
} from '@/utils/schemaProcessor';
import { formatElementLabel } from '@page-builder/templates';

import { EmptyState } from '../../common/EmptyState';
import { FormField } from '../../form/FormField';
import { Flex } from '../../layout/Flex';
import { Panel } from '../../layout/Panel';
import { SubTitle } from '../../typography/SubTitle';
import { Title } from '../../typography/Title';
import { HistoryControls } from '../HistoryControls';

export const PropertyPanel = () => {
  const { t, i18n } = useTranslation();
  const { selectedElement, selectedSubElement } = useSelection();
  const {
    getOnChangeHandler,
    getOnBlurHandler,
    getOnChangeEndHandler,
    shouldUseBlur,
    shouldUseChangeEnd,
  } = useFieldHandlers();
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );
  const currentConfig = useSelector((state) => state.builder.currentConfig);

  // Cache for enhanced field options (cleared when template changes)
  const enhancedFieldsCache = useRef(new Map());
  const lastTemplateId = useRef(selectedTemplate?.id);

  // Clear cache when template changes
  if (lastTemplateId.current !== selectedTemplate?.id) {
    enhancedFieldsCache.current.clear();
    lastTemplateId.current = selectedTemplate?.id;
  }

  // Memoize tempConfig to avoid recreating it on every render
  const tempConfig = useMemo(
    () => deepMerge(selectedTemplate?.defaultConfig || {}, currentConfig || {}),
    [selectedTemplate?.defaultConfig, currentConfig],
  );

  // Scroll PropertyPanel to top when selection changes
  useScrollToTopOnSelection(selectedSubElement || selectedElement);

  // Memoized field enhancement function
  const enhanceFieldOptions = useCallback(
    (field) =>
      enhanceOptions(field, selectedTemplate, t, enhancedFieldsCache.current),
    [selectedTemplate, t],
  );

  // Memoized field visibility check
  const shouldShowField = useCallback(
    (field) => checkFieldVisibility(field, tempConfig),
    [tempConfig],
  );

  //============================================
  // EARLY RETURNS (all hooks must be above)
  //============================================

  if (!selectedTemplate) {
    return (
      <Panel position="right" width="100%" className="property-panel">
        <Panel.Header>
          <Title level={3}>{t("propertyPanel.title.properties")}</Title>
        </Panel.Header>
        <Panel.Content>
          <EmptyState
            description={t("propertyPanel.emptyState.selectTemplate")}
          />
        </Panel.Content>
      </Panel>
    );
  }

  // Determine what element we're editing
  const activeElementId = selectedSubElement || selectedElement;

  if (!activeElementId) {
    // Show page-level settings when nothing is selected
    const pageFields = getFieldsForElement(
      selectedTemplate,
      "page",
      tempConfig,
    );

    return (
      <Panel position="right" width="100%" className="property-panel">
        <Panel.Header>
          <Title level={3}>{t("propertyPanel.title.pageSettings")}</Title>
          <SubTitle className="property-panel__subtitle">
            {selectedTemplate.name}
          </SubTitle>
        </Panel.Header>
        <Panel.Content>
          <Flex direction="column" gap={24}>
            {pageFields.fields.map((field) => {
              const enhancedField = enhanceFieldOptions(field);
              const rawValue = resolveFieldValue(tempConfig, field);
              const fieldValue = normalizeFieldValue(
                rawValue,
                enhancedField.type,
              );

              const usesBlur = shouldUseBlur(enhancedField.type);
              const usesChangeEnd = shouldUseChangeEnd(enhancedField.type);

              return (
                <FormField
                  key={field.path}
                  id={field.path}
                  label={enhancedField.label}
                  type={enhancedField.type}
                  value={fieldValue}
                  onChange={getOnChangeHandler(field.path, enhancedField.type)}
                  onBlur={usesBlur ? getOnBlurHandler(field.path) : undefined}
                  onChangeEnd={
                    usesChangeEnd
                      ? getOnChangeEndHandler(field.path)
                      : undefined
                  }
                  options={enhancedField.options}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  labels={field.labels}
                />
              );
            })}
          </Flex>
        </Panel.Content>
        <HistoryControls />
      </Panel>
    );
  }

  // Get fields for the selected element from the schema
  const elementFields = getFieldsForElement(
    selectedTemplate,
    activeElementId,
    tempConfig,
  );

  if (!elementFields.fields || elementFields.fields.length === 0) {
    return (
      <Panel position="right" width="100%" className="property-panel">
        <Panel.Header>
          <Title level={3}>{t("propertyPanel.title.properties")}</Title>
        </Panel.Header>
        <Panel.Content>
          <EmptyState
            description={`${t("propertyPanel.emptyState.noPropertiesPrefix")} "${activeElementId}"`}
          />
        </Panel.Content>
        <HistoryControls />
      </Panel>
    );
  }

  // Format element label for display using shared utility
  const formattedLabel = formatElementLabel(
    elementFields.label,
    activeElementId,
    getSingularTemplateName,
  );

  // Check if current language is RTL
  const isRTL =
    i18n.language.split("-")[0] === "ar" ||
    i18n.language.split("-")[0] === "he";

  // Check if current language is Vietnamese (needs prefix order like RTL)
  const isVietnamese = i18n.language.split("-")[0] === "vi";

  // Build title and subtitle with proper word order for RTL and Vietnamese
  const panelTitle = isRTL
    ? `${formattedLabel} ${t("propertyPanel.title.editPrefix")}`
    : `${t("propertyPanel.title.editPrefix")} ${formattedLabel}`;

  const panelSubtitle = selectedSubElement
    ? isRTL || isVietnamese
      ? `${t("propertyPanel.subtitle.sectionSuffix")} ${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)}`
      : `${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)} ${t("propertyPanel.subtitle.sectionSuffix")}`
    : selectedTemplate.name;

  return (
    <Panel position="right" width="100%" className="property-panel">
      <Panel.Header>
        <Title level={3}>{panelTitle}</Title>
        <SubTitle className="property-panel__subtitle">
          {panelSubtitle}
        </SubTitle>
      </Panel.Header>
      <Panel.Content>
        <Flex direction="column" gap={24}>
          {/* Render all fields */}
          {elementFields.fields.map((field) => {
            // Check if field should be visible
            if (!shouldShowField(field)) return null;

            const enhancedField = enhanceFieldOptions(field);
            const rawValue = resolveFieldValue(tempConfig, field);
            const fieldValue = normalizeFieldValue(
              rawValue,
              enhancedField.type,
            );

            const usesBlur = shouldUseBlur(enhancedField.type);
            const usesChangeEnd = shouldUseChangeEnd(enhancedField.type);

            return (
              <FormField
                key={field.path}
                id={field.path}
                label={enhancedField.label}
                type={enhancedField.type}
                value={fieldValue}
                onChange={getOnChangeHandler(field.path, enhancedField.type)}
                onBlur={usesBlur ? getOnBlurHandler(field.path) : undefined}
                onChangeEnd={
                  usesChangeEnd ? getOnChangeEndHandler(field.path) : undefined
                }
                options={enhancedField.options}
                min={field.min}
                max={field.max}
                step={field.step}
                labels={field.labels}
              />
            );
          })}
        </Flex>
      </Panel.Content>
      <HistoryControls />
    </Panel>
  );
};

// Memoize to prevent rerenders during resize drag operations
export const MemoizedPropertyPanel = memo(PropertyPanel);
MemoizedPropertyPanel.displayName = "MemoizedPropertyPanel";
