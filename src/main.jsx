import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import ThemeProvider from "./app/Providers/ThemeProvider";
import AuthProvider from "./app/Providers/AuthProvider";
import "katex/dist/katex.min.css";
import CreateTestProvider from "./app/Providers/CreateTestProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>

            <App />

        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
