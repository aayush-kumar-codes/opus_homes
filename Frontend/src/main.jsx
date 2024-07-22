import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Router } from "./router/Router.jsx";
import { ContextProvider } from "./context/ContextProvider.jsx";
import store from "./redux/store/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ContextProvider>
      <RouterProvider router={Router} />
    </ContextProvider>
  </Provider>
);
