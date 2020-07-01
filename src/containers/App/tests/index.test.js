import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles/";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalResponsiveFont from "../../../globalResponsiveFontCSS";
import theme from "../../../theme";
import store from "../store";

import App from "../index";

function getPreparedPage(store) {
  const generateClassName = (rule, styleSheet) =>
    `${styleSheet.options.classNamePrefix}-${rule.key}`;
  return (
    <Provider store={store}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalResponsiveFont />
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  );
}

describe("<App />", () => {
  xit("renders correctly and matches snapshot", () => {
    /* skipped because Material-UI generates random class counters at each render
    and that doesnt' match the class counter in the snapshot, tried below based on the
    following https://github.com/mui-org/material-ui/issues/9492 but it still doesn't work.
    I suspect that I should mock child components (need to learn how) */
    const { asFragment } = render(getPreparedPage(store));
    const initialRender = asFragment();
    expect(initialRender).toMatchSnapshot();
  });
  it("does not log errors in the console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(getPreparedPage(store));
    expect(spy).not.toHaveBeenCalled();
  });
});
