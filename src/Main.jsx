import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./common/GlobalStyle";
import { BrowserRouter } from "react-router-dom";

import "./util/windowInnerHeightSet";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
);
