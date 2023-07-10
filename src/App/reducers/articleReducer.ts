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

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async () => {
    const response = await axios.get('http://localhost:3500/api/article/all');
    return response.data;
  }
);

export const articleLiked = createAsyncThunk(
  'article/articleLiked',
  async ({
    articleId,
    updatedLikes,
  }: {
    articleId: number;
    updatedLikes: number;
  }) => {
    const response = await axios.put(
      `http://localhost:3500/api/article/${articleId}/update`,
      {
        likes: updatedLikes,
      }
    );
    return response.data;
  }
);

export const mainArticleLiked = createAsyncThunk(
  'article/mainArticleLiked',
  async ({
    articleId,
    updatedLikes,
  }: {
    articleId: number;
    updatedLikes: number;
  }) => {
    const response = await axios.put(
      `http://localhost:3500/api/article/${articleId}/update`,
      {
        likes: updatedLikes,
      }
    );
    return response.data;
  }
);

const articleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload;
    })
    .addCase(articleLiked.fulfilled, (state, action) => {
      const newLikes = action.payload.likes;
      const articleId = action.payload.article_id;
      const articleIndex = state.article.findIndex(
        (article) => article.article_id === articleId
      );
      state.article[articleIndex].likes = newLikes;
    })
    .addCase(mainArticleLiked.fulfilled, (state, action) => {
      const newLikes = action.payload.likes;
      state.mainArticle.article!.likes = newLikes;
    });
});

export default articleReducer;
