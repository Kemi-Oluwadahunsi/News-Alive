import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Filters from "../Filters";

// Mock the framer-motion module
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock the react-datepicker module
vi.mock("react-datepicker", () => {
  return {
    __esModule: true,
    default: ({ id, onChange, selected }) => (
      <input
        type="date"
        id={id}
        onChange={(e) => onChange(new Date(e.target.value))}
        value={selected ? selected.toISOString().split("T")[0] : ""}
      />
    ),
  };
});

describe("Filters", () => {
  const mockSetFilters = vi.fn();
  const mockFilters = {
    author: "",
    sources: [],
    fromDate: null,
  };
  const mockAuthors = ["Author 1", "Author 2", "Author 3"];
  const mockSources = ["Source 1", "Source 2", "Source 3"];

  it("renders the Filters component", () => {
    render(
      <Filters
        authors={mockAuthors}
        sources={mockSources}
        filters={mockFilters}
        setFilters={mockSetFilters}
      />
    );

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Authors")).toBeInTheDocument();
    expect(screen.getByText("Sources")).toBeInTheDocument();
    expect(screen.getByText("Published Date")).toBeInTheDocument();
  });

  it("toggles author list visibility", async () => {
    render(
      <Filters
        authors={mockAuthors}
        sources={mockSources}
        filters={mockFilters}
        setFilters={mockSetFilters}
      />
    );

    const authorButton = screen.getByText("Authors");
    fireEvent.click(authorButton);

    await waitFor(() => {
      expect(screen.getByText("Author 1")).toBeVisible();
    });

    fireEvent.click(authorButton);

    await waitFor(() => {
      expect(screen.queryByText("Author 1")).not.toBeInTheDocument();
    });
  });

  it("toggles source list visibility", async () => {
    render(
      <Filters
        authors={mockAuthors}
        sources={mockSources}
        filters={mockFilters}
        setFilters={mockSetFilters}
      />
    );

    const sourceButton = screen.getByText("Sources");
    fireEvent.click(sourceButton);

    await waitFor(() => {
      expect(screen.getByText("Source 1")).toBeVisible();
    });

    fireEvent.click(sourceButton);

    await waitFor(() => {
      expect(screen.queryByText("Source 1")).not.toBeInTheDocument();
    });
  });

  it("selects an author", async () => {
    render(
      <Filters
        authors={mockAuthors}
        sources={mockSources}
        filters={mockFilters}
        setFilters={mockSetFilters}
      />
    );

    const authorButton = screen.getByText("Authors");
    fireEvent.click(authorButton);

    await waitFor(() => {
      const authorCheckbox = screen.getByLabelText("Author 1");
      fireEvent.click(authorCheckbox);
    });

    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ author: "Author 1" })
    );
  });

  it("selects multiple sources", async () => {
    render(
      <Filters
        authors={mockAuthors}
        sources={mockSources}
        filters={mockFilters}
        setFilters={mockSetFilters}
      />
    );

    const sourceButton = screen.getByText("Sources");
    fireEvent.click(sourceButton);

    await waitFor(() => {
      const sourceCheckbox1 = screen.getByLabelText("Source 1");
      const sourceCheckbox2 = screen.getByLabelText("Source 2");
      fireEvent.click(sourceCheckbox1);
      fireEvent.click(sourceCheckbox2);
    });

    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ sources: ["Source 1", "Source 2"] })
    );
  });

  it("selects a date", () => {
    render(
      <Filters
        authors={mockAuthors}
        sources={mockSources}
        filters={mockFilters}
        setFilters={mockSetFilters}
      />
    );

    const datePicker = screen.getByLabelText("Published Date");
    fireEvent.change(datePicker, { target: { value: "2023-05-15" } });

    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ fromDate: expect.any(Date) })
    );
  });
});
