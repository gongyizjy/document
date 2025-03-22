// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./normalize.css";
import "./main.css";
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
  </BrowserRouter>
);
