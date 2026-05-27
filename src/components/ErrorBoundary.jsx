import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(err, info) {
    console.error("[ErrorBoundary]", err, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
            Something went wrong.
          </p>
          <p style={{ fontSize: "0.875rem", opacity: 0.6 }}>
            {this.state.error.message}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
