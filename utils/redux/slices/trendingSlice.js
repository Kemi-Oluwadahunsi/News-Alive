// This slice fetches data from one of the endpoints from NewsAPI for the trending topics component

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Be sure to include your API KEY from NewsAPI in a .env file
const API_KEY = import.meta.env.VITE_API_KEY; 
const API_URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`;

export const fetchTrendingTopics = createAsyncThunk(
  "trending/fetchTrendingTopics",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.articles
      .filter(
        (article) =>
          article.source.name !== "removed" && article.title !== "removed"
      )
      .map((article) => ({
        ...article,
        id: encodeURIComponent(article.title),
      }));
  }
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    topics: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingTopics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrendingTopics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topics = action.payload;
      })
      .addCase(fetchTrendingTopics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default trendingSlice.reducer;
