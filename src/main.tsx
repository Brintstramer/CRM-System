import "./main.css";
import "@ant-design/v5-patch-for-react-19";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { StrictMode } from "react";
import { ConfigProvider, App as AntdApp } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7f265b",
          colorBorder: "#d1d1d1",
          colorText: "#828282",
          colorLink: "#7f265b",
          fontWeightStrong: 600,
        },
        components: {
          Input: {
            controlHeight: 50,
          },
          Button: {
            controlHeight: 50,
            fontSize: 18,
            fontWeight: 600,
            colorPrimary: "#7f265b",
            colorPrimaryHover: "#6a1f4d",
            colorPrimaryActive: "#55193f",
          },
        },
      }}
    >
      <AntdApp>
        <Provider store={store}>
          <App />
        </Provider>
      </AntdApp>
    </ConfigProvider>
  </StrictMode>,
);
