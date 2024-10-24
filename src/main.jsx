import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PasswordCrackerApp from "./App.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <PasswordCrackerApp />
    </StrictMode>
  );
}
