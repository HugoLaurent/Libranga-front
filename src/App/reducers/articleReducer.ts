import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { ArticleAttributes } from '../../interface';

interface ArticleState {
  mainArticle: {
    article: ArticleAttributes | null;
    pseudo: string | null;
  };
  article: ArticleAttributes[];
}

export const initialState: ArticleState = {
  mainArticle: {
    article: null,
    pseudo: null,
  },
  article: [],
};

export const fetchMainArticle = createAsyncThunk(
  'article/fetchMainArticle',
  async () => {
    const response = await axios.get('http://localhost:3500/api/article/like');
    return response.data;
  }
);

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async () => {
    const response = await axios.get('http://localhost:3500/api/article/all');
    return response.data;
  }
);

export const articleLiked = createAction('article/articleLiked');

const articleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMainArticle.fulfilled, (state, action) => {
      return {
        ...state,
        mainArticle: action.payload,
      };
    })
    .addCase(fetchArticle.fulfilled, (state, action) => {
      return {
        ...state,
        article: action.payload,
      };
    });
});

export default articleReducer;
