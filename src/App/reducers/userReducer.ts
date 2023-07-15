import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { log } from 'console';

export const initialState = {
  user: [],
  addUserSuccess: false,
};

export const fetchAllUser = createAsyncThunk('user/fetchAllUser', async () => {
  const response = await axios.get('http://localhost:3500/api/user/all');
  const data = response.data;

  const userWithArticles = await Promise.all(
    data.map(async (user: any) => {
      const result = await axios.get(
        `http://localhost:3500/api/user/${user.user_id}/article`
      );
      const articles = result.data;
      return {
        ...user,
        articles,
      };
    })
  );

  return userWithArticles;
});

export const addUser = createAsyncThunk('user/addUser', async (user: any) => {
  const response = await axios.post(
    'http://localhost:3500/api/user/create',
    user
  );

  // Dispatch additional actions if needed

  return response.data;
});

export const resetAddUserStatus = createAction('user/resetAddUserStatus');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.user.push(action.payload);
      state.addUserSuccess = true;
    })
    .addCase(addUser.rejected, (state, action) => {
      state.user.push(action.payload);
      state.addUserSuccess = false;
    })
    .addCase(resetAddUserStatus, (state, action) => {
      state.addUserSuccess = false;
    });
});

export default userReducer;
