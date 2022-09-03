import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./common/GlobalStyle";

import { Provider } from "react-redux";
import store from "./redux/config/configStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  </Provider>
);
