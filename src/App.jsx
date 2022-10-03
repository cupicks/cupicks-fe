import Layout from "../src/common/Layout";
import RouteChangeTracker from "./shared/RouteChangeTracker";

import { ThemeProvider } from "styled-components";

import * as theme from "./styles/theme.js";
import GlobalStyle from "./styles/GlobalStyle";
import "./util/windowInnerHeightSet";
import { useEffect } from "react";

const App = () => {
  RouteChangeTracker();

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  setScreenSize();
  window.addEventListener("resize", setScreenSize);

  useEffect(() => {
    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  return (
    <ThemeProvider theme={theme.lightTheme}>
      <div className="app">
        <Layout />
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
};

export default App;
