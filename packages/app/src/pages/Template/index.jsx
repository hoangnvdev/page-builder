import { ErrorBoundary } from '@/components';

import { TemplateGallery } from '../../components/templates/TemplateGallery';

export const TemplatePage = () => {
  return (
    <ErrorBoundary fallbackType="component">
      <TemplateGallery />
    </ErrorBoundary>
  );
};
