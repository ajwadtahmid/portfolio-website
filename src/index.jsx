import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter/wght.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
