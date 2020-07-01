import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../index";

const mockProps = {
  title: "Scopely Player Ratings",
};

describe("<SideDrawer />", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header {...mockProps} />
      </MemoryRouter>
    );
    const initialRender = asFragment();
    expect(initialRender).toMatchSnapshot();
  });
  it("does not log errors in the console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <MemoryRouter>
        <Header {...mockProps} />
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });
  it("should contain the title that was sent as a prop", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header {...mockProps} />
      </MemoryRouter>
    );
    const title = getByText("Scopely Player Ratings").textContent;
    expect(title).toEqual(mockProps.title);
  });
});
