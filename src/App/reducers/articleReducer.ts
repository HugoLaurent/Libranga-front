import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

export const initialState = {
  mainArticle: [],
  article: [],
};

export const fetchMainArticle = createAsyncThunk(
  'article/fetchMainArticle',
  async () => {
    const response = await fetch('http://localhost:3500/api/article/like');
    const data = await response.json();

    return data;
  }
);

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async () => {
    const response = await fetch('http://localhost:3500/api/article/all');
    const data = await response.json();
    return data;
  }
);

const articleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMainArticle.fulfilled, (state, action) => {
      state.mainArticle = action.payload;
    })
    .addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload;
    });
});

export default articleReducer;