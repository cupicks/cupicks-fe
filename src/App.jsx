import Layout from "../src/common/Layout";
import RouteChangeTracker from "./shared/RouteChangeTracker";

import { ThemeProvider } from "styled-components";

import * as theme from "./styles/theme.js";
import GlobalStyle from "./styles/GlobalStyle";
import "./util/windowInnerHeightSet";

const App = () => {
  RouteChangeTracker();

  return (
    <ThemeProvider theme={theme.lightTheme}>
      <Layout />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
