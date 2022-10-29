import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const headerTitle = screen.getByText("Loading ...");
  expect(headerTitle).toBeInTheDocument();
});
