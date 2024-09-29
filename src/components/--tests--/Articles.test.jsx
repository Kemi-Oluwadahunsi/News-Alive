import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Articles from "../articles/Articles";
import articlesReducer, {
  setFilters,
  resetFilters,
} from "../../../utils/redux/slices/articlesSlice";

// Mock the framer-motion module
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn(),
  }),
  useInView: () => [null, false],
}));

// Mock the LoadingFallback component
vi.mock("../pages/LoadingFallback", () => ({
  default: () => <div data-testid="loading-fallback">Loading...</div>,
}));

// Mock the ArticleCard component
vi.mock("../articles/ArticleCard", () => ({
  default: ({ article }) => (
    <div data-testid="article-card">{article.title}</div>
  ),
}));

// Mock the SearchBar component
vi.mock("../landingPage/search/SearchBar", () => ({
  default: () => <div data-testid="search-bar">Search Bar</div>,
}));

// Mock the Filters component
vi.mock("../Filters", () => ({
  default: ({ setFilters }) => (
    <div data-testid="filters">
      <button onClick={() => setFilters({ author: "Test Author" })}>
        Set Filter
      </button>
    </div>
  ),
}));

describe("Articles", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        articles: articlesReducer,
      },
      preloadedState: {
        articles: {
          items: Array(12)
            .fill()
            .map((_, index) => ({
              title: `Article ${index + 1}`,
              author: `Author ${index + 1}`,
              source: { name: `Source ${index + 1}` },
              description: `Description ${index + 1}`,
              publishedAt: new Date().toISOString(),
            })),
          filteredArticles: [],
          filters: {
            keyword: "",
            author: "",
            sources: [],
            fromDate: null,
          },
          loading: false,
          status: "idle",
        },
      },
    });
  });

  it("renders the Articles component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Articles />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Latest articles")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("filters")).toBeInTheDocument();
  });

  it("displays articles", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Articles />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Article 2")).toBeInTheDocument();
    expect(screen.getByText("Article 3")).toBeInTheDocument();
  });

  it('loads more articles when clicking "Load More"', async () => {
    const mockDispatch = vi.fn(() => Promise.resolve());
    vi.spyOn(store, "dispatch").mockImplementation(mockDispatch);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Articles />
        </BrowserRouter>
      </Provider>
    );

    const loadMoreButton = screen.getByText("Load More");
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });
  it("applies filters", async () => {
    vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Articles />
        </BrowserRouter>
      </Provider>
    );

    const setFilterButton = screen.getByText("Set Filter");
    fireEvent.click(setFilterButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        setFilters(expect.objectContaining({ author: "Test Author" }))
      );
    });
  });

  it("resets filters", async () => {
    store = configureStore({
      reducer: {
        articles: articlesReducer,
      },
      preloadedState: {
        articles: {
          items: [],
          filteredArticles: [],
          filters: { keyword: "test", author: "", sources: [], fromDate: null },
          loading: false,
          status: "idle",
        },
      },
    });

    vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Articles />
        </BrowserRouter>
      </Provider>
    );

    const resetFiltersButton = screen.getByText("Reset Filters");
    fireEvent.click(resetFiltersButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(resetFilters());
    });
  });

  it("displays loading fallback when loading", () => {
    store = configureStore({
      reducer: {
        articles: articlesReducer,
      },
      preloadedState: {
        articles: {
          items: [],
          filteredArticles: [],
          filters: { keyword: "", author: "", sources: [], fromDate: null },
          loading: true,
          status: "loading",
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Articles />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("loading-fallback")).toBeInTheDocument();
  });
});
