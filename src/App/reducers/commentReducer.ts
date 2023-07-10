import axios from 'axios';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

export const initialState = {
  comments: [],
};

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async () => {
    const response = await axios.get(`http://localhost:3500/api/comment/all`);
    return response.data;
  }
);

const commentReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchComments.fulfilled, (state, action) => {
    state.comments = action.payload;
  });
});

export default commentReducer;
