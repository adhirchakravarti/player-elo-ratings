import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideDrawer from "../index";

const mockProps = {
  open: true,
  onClose: jest.fn(),
};

describe("<SideDrawer />", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SideDrawer {...mockProps} />
      </MemoryRouter>
    );
    const initialRender = asFragment();
    expect(initialRender).toMatchSnapshot();
  });
  it("does not log errors in the console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <MemoryRouter>
        <SideDrawer {...mockProps} />
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });
  it("should fire the callback 1 time", () => {
    const { getByText } = render(
      <MemoryRouter>
        <SideDrawer {...mockProps} />
      </MemoryRouter>
    );
    const link = getByText("Rating Table");
    fireEvent.click(link);

    expect(mockProps.onClose.mock.calls.length).toBe(1);
  });
});
