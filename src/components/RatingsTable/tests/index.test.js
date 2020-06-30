import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RatingsTable from "../index";
import { tableRowData, tableColumns } from "../mockData";

describe("<RatingsTable />", () => {
  it("Should render correctly and match snapshot", () => {
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
