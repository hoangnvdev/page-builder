import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "40px",
            maxWidth: "800px",
            margin: "0 auto",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <h1 style={{ color: "#c33", marginTop: 0 }}>
              ⚠️ Something went wrong
            </h1>
            <p style={{ color: "#666" }}>
              An unexpected error occurred while rendering this page. Please
              refresh to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#c33",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                marginRight: "12px",
              }}
            >
              Refresh Page
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                backgroundColor: "transparent",
                color: "#666",
                border: "1px solid #ddd",
                padding: "12px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Try Again
            </button>
          </div>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <details style={{ marginTop: "24px" }}>
              <summary
                style={{
                  cursor: "pointer",
                  color: "#666",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "16px",
                  borderRadius: "6px",
                  overflow: "auto",
                  fontSize: "12px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Error:</strong> {this.state.error.toString()}
                {"\n\n"}
                <strong>Component Stack:</strong>
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
