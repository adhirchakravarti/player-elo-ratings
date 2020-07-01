import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles/";
import theme from "../../../theme";
import DataTable from "../index";
import {
  tableColumns as playerRatingColumns,
  tableRowData as playerRatingRowData,
} from "../mockData/mockPlayerRatings";
import {
  tableColumns as playerMatchesColumns,
  tableRowData as playerMatchesRowData,
  playerName,
} from "../mockData/mockPlayerMatches";

describe("<DataTable />", () => {
  xit("Should render correctly and match snapshot when provided all player ratings data", () => {
    /* skipped because Material-UI generates random class counters at each render
    and that doesnt' match the class counter in the snapshot, tried below based on the
    following https://github.com/mui-org/material-ui/issues/9492 but it still doesn't work.
    I suspect that I should mock child components (need to learn how) */
    const handleAddNewMatch = jest.fn();
    const generateClassName = (rule, styleSheet) =>
      `${styleSheet.options.classNamePrefix}-${rule.key}`;
    const { asFragment } = render(
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <DataTable
              tableColumns={playerRatingColumns}
              tableRowData={playerRatingRowData}
              addNewMatch={handleAddNewMatch}
            />
          </MemoryRouter>
        </ThemeProvider>
      </StylesProvider>
    );
    const initialRender = asFragment();
    expect(initialRender).toMatchSnapshot();
  });
  it("renders the correct count of rows and columns as supplied in player ratings data", () => {
    const handleAddNewMatch = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <DataTable
          tableColumns={playerRatingColumns}
          tableRowData={playerRatingRowData}
          addNewMatch={handleAddNewMatch}
        />
      </MemoryRouter>
    );
    const table = container.querySelectorAll("table.MuiTable-root");
    expect(table).toHaveLength(2);
    const header = container.querySelectorAll("thead.MuiTableHead-root");
    expect(header).toHaveLength(1);
    const footer = container.querySelectorAll("tfoot.MuiTableFooter-root");
    expect(footer).toHaveLength(1);
    // not accurate due to Table Pagination
    const rows = container.querySelectorAll("tr.MuiTableRow-root:not(:empty)");
    expect(rows.length - (header.length + footer.length)).toBe(
      playerRatingRowData.length
    );
    const columns = container.querySelectorAll("th.MuiTableCell-head");
    expect(columns).toHaveLength(playerRatingColumns.length);
  });
  it("Should not log errors in console when rendering all player ratings data", () => {
    const spy = jest.spyOn(global.console, "error");
    const handleAddNewMatch = jest.fn();
    render(
      <MemoryRouter>
        <DataTable
          tableColumns={playerRatingColumns}
          tableRowData={playerRatingRowData}
          addNewMatch={handleAddNewMatch}
        />
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });
  xit("Should render correctly and match snapshot when provided single player matches data", () => {
    /* skipped because Material-UI generates random class counters at each render
    and that doesnt' match the class counter in the snapshot, tried below based on the
    following https://github.com/mui-org/material-ui/issues/9492 but it still doesn't work.
    I suspect that I should mock child components (need to learn how) */
    const { asFragment } = render(
      <MemoryRouter>
        <DataTable
          tableColumns={playerMatchesColumns}
          tableRowData={playerMatchesRowData}
          playerName={playerName}
        />
      </MemoryRouter>
    );
    const initialRender = asFragment();
    expect(initialRender).toMatchSnapshot();
  });
  it("renders the correct count of rows and columns as supplied in single player matches data", () => {
    const { container } = render(
      <MemoryRouter>
        <DataTable
          tableColumns={playerMatchesColumns}
          tableRowData={playerMatchesRowData}
          playerName={playerName}
        />
      </MemoryRouter>
    );
    const table = container.querySelectorAll("table.MuiTable-root");
    expect(table).toHaveLength(2);
    const header = container.querySelectorAll("thead.MuiTableHead-root");
    expect(header).toHaveLength(1);
    const footer = container.querySelectorAll("tfoot.MuiTableFooter-root");
    expect(footer).toHaveLength(1);
    // not accurate due to Table Pagination
    const rows = container.querySelectorAll("tr.MuiTableRow-root:not(:empty)");
    expect(rows.length - (header.length + footer.length)).toBe(
      playerMatchesRowData.length
    );
    const columns = container.querySelectorAll("th.MuiTableCell-head");
    expect(columns).toHaveLength(playerMatchesColumns.length);
  });
  it("Should not log errors in console when rendering single player matches data", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <MemoryRouter>
        <DataTable
          tableColumns={playerMatchesColumns}
          tableRowData={playerMatchesRowData}
          playerName={playerName}
        />
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
