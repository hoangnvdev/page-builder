import './index.scss';

import React from 'react';

import PropTypes from 'prop-types';

import { ErrorDisplay } from '../ErrorDisplay';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      dimensions: null, // Store dimensions to prevent layout shift
    };
    this.containerRef = React.createRef();
    this.resizeObserver = null;
  }

  componentDidMount() {
    // Set up resize observer to track container dimensions
    if (this.containerRef.current && typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver((entries) => {
        if (entries[0] && !this.state.hasError) {
          const { width, height } = entries[0].contentRect;
          this.setState({
            dimensions: { width, height },
          });
        }
      });
      this.resizeObserver.observe(this.containerRef.current);
    }
  }

  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { componentName, onError } = this.props;

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      const prefix = componentName
        ? `[ErrorBoundary:${componentName}]`
        : "[ErrorBoundary]";
      console.error(`${prefix} Error caught:`, error);
      console.error("Error info:", errorInfo);
    }

    // Store error details in state
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error callback
    if (onError) {
      onError(error, errorInfo, componentName);
    }

    // TODO: Log error to error reporting service (e.g., Sentry, LogRocket)
    // Example: logErrorToService({ componentName, error, errorInfo });
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

  // Translation helper with fallback
  t = (key, fallback) => {
    const { t } = this.props;
    return t ? t(key, fallback) : fallback;
  };

  renderPageFallback() {
    const { error, errorInfo } = this.state;

    const errorDetails =
      error && errorInfo
        ? `${error.toString()}\n\nComponent Stack:\n${errorInfo.componentStack}`
        : error
          ? error.toString()
          : "Unknown error";

    const actions = (
      <>
        <button
          className="error-boundary__button error-boundary__button--primary"
          onClick={this.handleReload}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          {this.t("errorBoundary.actions.reload", "Reload Page")}
        </button>
        {this.props.resetPath && (
          <button
            className="error-boundary__button error-boundary__button--secondary"
            onClick={this.handleReset}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {this.t("errorBoundary.actions.goHome", "Go to Home")}
          </button>
        )}
      </>
    );

    const message = (
      <>
        <p className="error-boundary__message">
          {this.t(
            "errorBoundary.page.message",
            "We apologize for the inconvenience. The application encountered an unexpected error.",
          )}
        </p>
        <p className="error-boundary__submessage">
          {this.t(
            "errorBoundary.page.submessage",
            "Don't worry, your work is safe. Try reloading the page to continue.",
          )}
        </p>
      </>
    );

    return (
      <div className="error-boundary error-boundary--page">
        <ErrorDisplay
          title={this.t(
            "errorBoundary.page.title",
            "Oops! Something went wrong",
          )}
          message={message}
          details={errorDetails}
          showDetails={true}
          actions={actions}
          size="medium"
          t={this.props.t}
        />
      </div>
    );
  }

  renderComponentFallback() {
    const { componentName } = this.props;
    const { error, dimensions } = this.state;

    // Preserve dimensions to prevent layout shift
    const style = dimensions
      ? {
          minWidth: `${dimensions.width}px`,
          minHeight: `${dimensions.height}px`,
        }
      : {};

    const errorDetails = error ? error.toString() : "Unknown error";

    const actions = (
      <button
        className="error-boundary__button error-boundary__button--secondary error-boundary__button--small"
        onClick={this.handleReset}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
        {this.t("errorBoundary.actions.retry", "Retry")}
      </button>
    );

    const title = this.t("errorBoundary.component.title", "Component Error");
    const message = (
      <>
        {componentName && (
          <p className="error-boundary__component-name">{componentName}</p>
        )}
        <p>
          {this.t(
            "errorBoundary.component.message",
            "This section couldn't load properly. Click retry to try again.",
          )}
        </p>
      </>
    );

    return (
      <div className="error-boundary error-boundary--component" style={style}>
        <ErrorDisplay
          title={title}
          message={message}
          details={errorDetails}
          showDetails={true}
          actions={actions}
          size="small"
          t={this.props.t}
        />
      </div>
    );
  }

  renderInlineFallback() {
    return (
      <div className="error-boundary error-boundary--inline">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span>{this.t("errorBoundary.inline.message", "Failed to load")}</span>
        <button
          className="error-boundary__retry-btn"
          onClick={this.handleReset}
          aria-label={this.t("errorBoundary.actions.retry", "Retry")}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          {this.t("errorBoundary.actions.retry", "Retry")}
        </button>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      const { mode = "component", fallback } = this.props;

      // Custom fallback takes precedence
      if (fallback) {
        return typeof fallback === "function"
          ? fallback(this.state.error, this.props.componentName)
          : fallback;
      }

      // Built-in fallback modes
      switch (mode) {
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

    // Wrap children with ref to track dimensions
    return (
      <div ref={this.containerRef} style={{ height: "100%", width: "100%" }}>
        {this.props.children}
      </div>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  mode: PropTypes.oneOf(["page", "component", "inline"]),
  componentName: PropTypes.string,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onError: PropTypes.func,
  onReset: PropTypes.func,
  resetPath: PropTypes.string,
  t: PropTypes.func, // i18n translation function (optional)
};

ErrorBoundary.defaultProps = {
  mode: "component",
  componentName: null,
  fallback: null,
  onError: null,
  onReset: null,
  resetPath: null,
  t: null,
};

export default ErrorBoundary;
