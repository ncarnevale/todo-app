import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("@tanstack/react-query", () => ({
  useQuery: () => ({ data: [] }),
  useMutation: () => ({ mutate: () => {} }),
  useQueryClient: () => ({}),
}));

describe("App", () => {
  it("renders", () => {
    const { getByText } = render(<App />);
    expect(screen.getByText("To-Do")).toBeInTheDocument();
  });
});
