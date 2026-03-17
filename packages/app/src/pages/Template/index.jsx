import { ErrorBoundary } from '@/components';

import { TemplateGallery } from '../../components/TemplateGallery';

export const TemplatePage = () => {
  return (
    <ErrorBoundary fallbackType="component">
      <TemplateGallery />
    </ErrorBoundary>
  );
};
