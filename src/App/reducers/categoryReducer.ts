import axios from 'axios';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

export const initialState = {
  categories: [],
  categoryWithArticle: [],
};

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async () => {
    const response = await axios.get(`http://localhost:3500/api/category/all`);
    return response.data;
  }
);

export const fetchCategoryWithArticle = createAsyncThunk(
  'category/fetchCategoryWithArticle',
  async (id) => {
    const response = await axios.get(
      `http://localhost:3500/api/category/${id}`
    );
    console.log(response.data);

    return response.data;
  }
);

const categoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchCategory.fulfilled, (state, action) => {
    state.categories = action.payload;
  });
  builder.addCase(fetchCategoryWithArticle.fulfilled, (state, action) => {
    state.categoryWithArticle = action.payload;
  });
});

export default categoryReducer;
