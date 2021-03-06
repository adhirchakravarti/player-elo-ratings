import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RatingsTable from "../index";
import { tableRowData, tableColumns } from "../mockData";

describe("<RatingsTable />", () => {
  xit("Should render correctly and match snapshot", () => {
    /* skipped because Material-UI generates random class counters at each render
    and that doesnt' match the class counter in the snapshot, tried below based on the
    following https://github.com/mui-org/material-ui/issues/9492 but it still doesn't work.
    I suspect that I should mock child components (need to learn how) */
    const handleAddNewMatch = jest.fn();
    const { asFragment } = render(
      <MemoryRouter>
        <RatingsTable
          tableColumns={tableColumns}
          tableRowData={tableRowData}
          addNewMatch={handleAddNewMatch}
        />
      </MemoryRouter>
    );
    const initialRender = asFragment();
    expect(initialRender).toMatchSnapshot();
  });
  it("Should not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const handleAddNewMatch = jest.fn();
    render(
      <MemoryRouter>
        <RatingsTable
          tableColumns={tableColumns}
          tableRowData={tableRowData}
          addNewMatch={handleAddNewMatch}
        />
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
