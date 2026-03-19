import { ErrorBoundary } from "@/components";

export const withErrorBoundary = (
  WrappedComponent,
  { fallbackType = "component", mode = "inline", onError } = {},
) => {
  const WithErrorBoundary = (props) => {
    return (
      <ErrorBoundary fallbackType={fallbackType} mode={mode} onError={onError}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  WithErrorBoundary.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithErrorBoundary;
};
