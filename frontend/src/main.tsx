import React, { Component, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/main.scss";

/**
 * Error Boundary Component - Catches errors to prevent app crashes.
 */
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error("🚨 App Crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong. Please try again later.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error(
    "❌ Root element not found. Ensure index.html has <div id='root'>."
  );
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("❌ React failed to render:", error);
  }
}
