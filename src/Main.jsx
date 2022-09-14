import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./common/GlobalStyle";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/config/configStore";

import './util/windowInnerHeightSet'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyle />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
