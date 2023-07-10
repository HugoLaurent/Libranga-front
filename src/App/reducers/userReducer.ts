import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

export const initialState = {
  user: [],
};

export const fetchAllUser = createAsyncThunk('user/fetchAllUser', async () => {
  const response = await fetch('http://localhost:3500/api/user/all');
  const data = await response.json();

  const userWithArticles = await Promise.all(
    data.map(async (user: any) => {
      const result = await fetch(
        `http://localhost:3500/api/user/${user.user_id}/article`
      );
      const articles = await result.json();
      return {
        ...user,
        articles,
      };
    })
  );

  console.log(userWithArticles);

  return userWithArticles;
});

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchAllUser.fulfilled, (state, action) => {
    state.user = action.payload;
  });
});

export default userReducer;
