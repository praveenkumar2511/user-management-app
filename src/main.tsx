import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "antd/dist/reset.css";
import { App as AntdApp } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AntdApp>
        <AppRoutes />
      </AntdApp>
    </Provider>
  </React.StrictMode>
);
