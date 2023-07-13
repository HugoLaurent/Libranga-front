import axios from 'axios';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

export const initialState = {
  categories: [],
};

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async () => {
    const response = await axios.get(`http://localhost:3500/api/category/all`);
    return response.data;
  }
);

const categoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchCategory.fulfilled, (state, action) => {
    state.categories = action.payload;
  });
});

export default categoryReducer;
