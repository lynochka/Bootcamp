import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import configureAppStore from "./redux/configureAppStore";
import { Provider as ReduxProvider } from "react-redux";

// can be useful to pass initial state into the store
// if server rendering or initalizing your Redux store with data from local storage
const store = configureAppStore();

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);
