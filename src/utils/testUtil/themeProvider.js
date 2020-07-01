import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles/";
import theme from "../../theme";

const generateClassName = (rule, styleSheet) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`;

export const provideTheme = (ui) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>{ui}</MuiThemeProvider>
    </StylesProvider>
  );
};
