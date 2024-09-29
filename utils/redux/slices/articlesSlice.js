import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Be sure to include your API KEY from NewsAPI in a .env file
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + API_KEY;

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.articles.filter(
      (article) => article.source.name !== "removed"
    );
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    items: [],
    filteredArticles: [],
    status: "idle",
    error: null,
    filters: {
      keyword: "",
      author: "",
      sources: [],
    },
    page: 1,
    loading: false,
  },

  // filtering and searching logic. Filters by article sources, authors, and date, and searches by keyword input
  reducers: {
    setFilters: (state, action) => {
      const newFilters = { ...state.filters, ...action.payload };
      if (JSON.stringify(newFilters) !== JSON.stringify(state.filters)) {
        state.filters = newFilters;
        state.filteredArticles = state.items.filter((article) => {
          const keyword = state.filters.keyword.toLowerCase();
          const author = state.filters.author.toLowerCase();
          const sources = state.filters.sources;
          const fromDate = state.filters.fromDate;

          const matchesKeyword =
            keyword === "" ||
            Object.values(article).some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(keyword)
            );
          const matchesAuthor =
            !author || article.author?.toLowerCase() === author;
          const matchesSources =
            sources.length === 0 || sources.includes(article.source.name);
            const matchesDate =
              !fromDate ||
              new Date(article.publishedAt).toDateString() ===
                fromDate.toDateString();

          return matchesKeyword && matchesAuthor && matchesSources && matchesDate;
        });
        state.page = 1;
      }
    },
    loadMoreArticles: (state) => {
      state.page += 1;
    },
    resetFilters: (state) => {
      state.filters = {
        keyword: "",
        author: "",
        sources: [],
        fromDate: null,
      };
      state.filteredArticles = state.items;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredArticles = action.payload;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setFilters, loadMoreArticles, resetFilters } =
  articlesSlice.actions;

export default articlesSlice.reducer;
