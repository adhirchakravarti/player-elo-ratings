import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./main.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalResponsiveFont from "./globalResponsiveFontCSS";
import theme from "./theme";
import App from "./containers/App";
import store from "./containers/App/store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalResponsiveFont />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("appContainer")
);
