// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_KEY = "dcf67487b3f7416ca452e734b85c7272";
// const API_URL =
//   "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
//   API_KEY;

// export const fetchArticles = createAsyncThunk(
//   "articles/fetchArticles",
//   async () => {
//     const response = await axios.get(API_URL);
//     return response.data.articles;
//   }
// );

// const articlesSlice = createSlice({
//   name: "articles",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchArticles.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchArticles.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchArticles.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default articlesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      category: "",
      sources: [],
    },
    page: 1,
    loading: false,
  },
  reducers: {
    setFilters: (state, action) => {
      const newFilters = { ...state.filters, ...action.payload };
      if (JSON.stringify(newFilters) !== JSON.stringify(state.filters)) {
        state.filters = newFilters;
        state.filteredArticles = state.items.filter((article) => {
          const keyword = state.filters.keyword.toLowerCase();
          const category = state.filters.category.toLowerCase();
          const sources = state.filters.sources;

          const matchesKeyword =
            keyword === "" ||
            Object.values(article).some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(keyword)
            );
          const matchesCategory =
            !category || article.category?.toLowerCase() === category;
          const matchesSources =
            sources.length === 0 || sources.includes(article.source.name);

          return matchesKeyword && matchesCategory && matchesSources;
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
        category: "",
        sources: [],
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

//   const articlesSlice = createSlice({
//     name: "articles",
//     initialState: {
//       items: [],
//       filteredArticles: [],
//       status: "idle",
//       error: null,
//       filters: {
//         keyword: "",
//         category: "",
//         sources: [],
//       },
//       page: 1,
//       loading: false,
//     },
//     reducers: {
//       setFilters: (state, action) => {
//         const newFilters = { ...state.filters, ...action.payload };
//         if (JSON.stringify(newFilters) !== JSON.stringify(state.filters)) {
//           state.filters = newFilters;
//           state.filteredArticles = state.items.filter((article) => {
//             const keyword = state.filters.keyword.toLowerCase();
//             const category = state.filters.category.toLowerCase();
//             const sources = state.filters.sources;

//             const matchesKeyword =
//               article.title.toLowerCase().includes(keyword) ||
//               article.description.toLowerCase().includes(keyword);
//             const matchesCategory =
//               !category || article.category?.toLowerCase() === category;
//             const matchesSources =
//               sources.length === 0 || sources.includes(article.source.name);

//             return matchesKeyword && matchesCategory && matchesSources;
//           });
//           state.page = 1;
//         }
//       },
//       loadMoreArticles: (state) => {
//         state.page += 1;
//       },
//       resetFilters: (state) => {
//         state.filters = {
//           keyword: "",
//           category: "",
//           sources: [],
//         };
//         state.filteredArticles = state.items;
//         state.page = 1;
//       },
//     },
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchArticles.pending, (state) => {
//           state.status = "loading";
//           state.loading = true;
//         })
//         .addCase(fetchArticles.fulfilled, (state, action) => {
//           state.status = "succeeded";
//           state.items = action.payload;
//           state.filteredArticles = action.payload;
//           state.loading = false;
//         })
//         .addCase(fetchArticles.rejected, (state, action) => {
//           state.status = "failed";
//           state.error = action.error.message;
//           state.loading = false;
//         });
//     },
//   });

//   export const { setFilters, loadMoreArticles, resetFilters } =
//     articlesSlice.actions;

//   export default articlesSlice.reducer;

