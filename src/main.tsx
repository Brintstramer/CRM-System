import "./main.css";
import "@ant-design/v5-patch-for-react-19";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
);
