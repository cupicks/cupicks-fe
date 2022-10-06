import { useEffect } from "react";

import Layout from "../src/common/Layout";
import RouteChangeTracker from "./shared/RouteChangeTracker";
import handleScreenSize from "./util/handleScreenSize";

import { ThemeProvider } from "styled-components";
import * as theme from "./styles/theme.js";
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  RouteChangeTracker();

  useEffect(() => {
    handleScreenSize();

    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
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
