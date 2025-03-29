import { Provider } from "@/components/ui/provider"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import customTheme from "./theme";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider theme={customTheme}>
      <App />
    </Provider>
  </StrictMode>
);
