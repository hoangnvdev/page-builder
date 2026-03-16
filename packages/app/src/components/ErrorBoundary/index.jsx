import "./index.scss";

import React from "react";

import { AlertTriangle } from "lucide-react";
import { withTranslation } from "react-i18next";

import { Button } from "@page-builder/ui";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error);
      console.error("Error info:", errorInfo);
    }

    // Store error details in state
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: Log error to error reporting service (e.g., Sentry, LogRocket)
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    const { onReset, resetPath } = this.props;

    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Call optional reset callback
    if (onReset) {
      onReset();
    }

    // Navigate to reset path if provided
    if (resetPath) {
      window.location.href = resetPath;
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  renderPageFallback() {
    const { t } = this.props;
    const { error } = this.state;

    return (
      <div className="error-boundary error-boundary--page">
        <div className="error-boundary__container">
          <div className="error-boundary__icon">
            <AlertTriangle size={64} />
          </div>
          <h1 className="error-boundary__title">
            {t("errorBoundary.page.title", "Something went wrong")}
          </h1>
          <p className="error-boundary__message">
            {t(
              "errorBoundary.page.message",
              "We're sorry, but something unexpected happened. Please try reloading the page.",
            )}
          </p>
          {process.env.NODE_ENV === "development" && error && (
            <details className="error-boundary__details">
              <summary>
                {t("errorBoundary.showDetails", "Show error details")}
              </summary>
              <pre className="error-boundary__error-text">
                {error.toString()}
              </pre>
              {this.state.errorInfo && (
                <pre className="error-boundary__stack">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </details>
          )}
          <div className="error-boundary__actions">
            <Button variant="primary" onClick={this.handleReload}>
              {t("errorBoundary.actions.reload", "Reload Page")}
            </Button>
            {this.props.resetPath && (
              <Button variant="secondary" onClick={this.handleReset}>
                {t("errorBoundary.actions.goHome", "Go to Home")}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  renderComponentFallback() {
    const { t } = this.props;
    const { error } = this.state;

    return (
      <div className="error-boundary error-boundary--component">
        <div className="error-boundary__container">
          <div className="error-boundary__icon error-boundary__icon--small">
            <AlertTriangle size={32} />
          </div>
          <h3 className="error-boundary__title error-boundary__title--small">
            {t("errorBoundary.component.title", "Component Error")}
          </h3>
          <p className="error-boundary__message error-boundary__message--small">
            {t(
              "errorBoundary.component.message",
              "This component failed to load. Please try again.",
            )}
          </p>
          {process.env.NODE_ENV === "development" && error && (
            <details className="error-boundary__details error-boundary__details--small">
              <summary>
                {t("errorBoundary.showDetails", "Show error details")}
              </summary>
              <pre className="error-boundary__error-text">
                {error.toString()}
              </pre>
            </details>
          )}
          <div className="error-boundary__actions">
            <Button variant="secondary" size="small" onClick={this.handleReset}>
              {t("errorBoundary.actions.retry", "Retry")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  renderInlineFallback() {
    const { t } = this.props;

    return (
      <div className="error-boundary error-boundary--inline">
        <AlertTriangle size={16} />
        <span>{t("errorBoundary.inline.message", "Failed to load")}</span>
        <button
          className="error-boundary__retry-btn"
          onClick={this.handleReset}
          aria-label={t("errorBoundary.actions.retry", "Retry")}
        >
          {t("errorBoundary.actions.retry", "Retry")}
        </button>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      const { fallbackType = "component" } = this.props;

      switch (fallbackType) {
        case "page":
          return this.renderPageFallback();
        case "component":
          return this.renderComponentFallback();
        case "inline":
          return this.renderInlineFallback();
        default:
          return this.renderComponentFallback();
      }
    }

    return this.props.children;
  }
}

// Export with i18n HOC
export default withTranslation()(ErrorBoundary);

// Export without i18n for cases where i18n is not available yet
export class ErrorBoundaryWithoutI18n extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error);
      console.error("Error info:", errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary error-boundary--page">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">
              <AlertTriangle size={64} />
            </div>
            <h1 className="error-boundary__title">Something went wrong</h1>
            <p className="error-boundary__message">
              We're sorry, but something unexpected happened. Please try
              reloading the page.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="error-boundary__details">
                <summary>Show error details</summary>
                <pre className="error-boundary__error-text">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre className="error-boundary__stack">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}
            <div className="error-boundary__actions">
              <button
                className="error-boundary__button"
                onClick={this.handleReload}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
