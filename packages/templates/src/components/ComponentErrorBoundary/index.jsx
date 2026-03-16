import React from "react";

import PropTypes from "prop-types";

class ComponentErrorBoundary extends React.Component {
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
    const { componentName, onError } = this.props;

    if (process.env.NODE_ENV === "development") {
      console.error(
        `[ComponentErrorBoundary] Error in component: ${componentName}`,
      );
      console.error("Error:", error);
      console.error("Error Info:", errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });

    if (onError) {
      onError(error, errorInfo, componentName);
    }

    // TODO: Send to error reporting service
    // Example: logErrorToService({ componentName, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const { componentName, fallback } = this.props;

      if (fallback) {
        return typeof fallback === "function"
          ? fallback(this.state.error, componentName)
          : fallback;
      }

      return (
        <div
          style={{
            padding: "1rem",
            margin: "0.5rem 0",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            color: "#991b1b",
            fontSize: "0.875rem",
          }}
        >
          <strong>⚠️ Component Error:</strong> {componentName}
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>
                Show details
              </summary>
              <pre
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  overflow: "auto",
                  maxHeight: "200px",
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ComponentErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  componentName: PropTypes.string.isRequired,
  onError: PropTypes.func,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

ComponentErrorBoundary.defaultProps = {
  componentName: "Unknown Component",
  onError: null,
  fallback: null,
};

export default ComponentErrorBoundary;
