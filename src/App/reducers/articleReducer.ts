import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { ArticleAttributes } from '../../interface';

interface ArticleState {
  filter(arg0: (articleTest: any) => any): unknown;
  article: ArticleAttributes[];
}

export const initialState: ArticleState = {
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

export const createArticle = createAsyncThunk(
  'article/createArticle',

  async (article: ArticleAttributes) => {
    console.log(article);

    const response = await axios.post(
      'http://localhost:3500/api/article/create',
      article
    );
    return response.data;
  }
);

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async (articleId: number) => {
    const response = await axios.delete(
      `http://localhost:3500/api/article/${articleId}/delete`
    );
    return response.data;
  }
);

export const modifyTitleArticle = createAsyncThunk(
  'article/modifyTitleArticle',
  async ({ articleId, title }) => {
    // Utiliser un objet avec les deux propriétés
    const response = await axios.put(
      `http://localhost:3500/api/article/${articleId}/update`,
      { title } // Envoyer l'objet avec la propriété "title"
    );
    return response.data;
  }
);
export const modifyContentArticle = createAsyncThunk(
  'article/modifyContentArticle',
  async ({ articleId, content }) => {
    // Utiliser un objet avec les deux propriétés
    const response = await axios.put(
      `http://localhost:3500/api/article/${articleId}/update`,
      { content } // Envoyer l'objet avec la propriété "title"
    );
    return response.data;
  }
);

const articleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload;
    })
    .addCase(createArticle.fulfilled, (state, action) => {
      state.article.push(action.payload);
    })
    .addCase(deleteArticle.fulfilled, (state, action) => {
      const articleId = action.payload.article_id;
      state.article = state.article.filter(
        (article) => article.article_id !== articleId
      );
    })
    .addCase(modifyTitleArticle.fulfilled, (state, action) => {
      const modifiedArticle = action.payload;
      state.article = state.article.map((article) =>
        article.article_id === modifiedArticle.article_id
          ? { ...article, title: modifiedArticle.title }
          : article
      );
    })
    .addCase(modifyContentArticle.fulfilled, (state, action) => {
      const modifiedArticle = action.payload;
      state.article = state.article.map((article) =>
        article.article_id === modifiedArticle.article_id
          ? { ...article, content: modifiedArticle.content }
          : article
      );
    })

    .addCase(articleLiked.fulfilled, (state, action) => {
      const newLikes = action.payload.likes;
      const articleId = action.payload.article_id;
      const articleIndex = state.article.findIndex(
        (article) => article.article_id === articleId
      );
      state.article[articleIndex].likes = newLikes;
    });
});

export default articleReducer;
