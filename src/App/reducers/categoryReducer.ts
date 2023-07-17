import {
  createAsyncThunk,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { ArticleAttributes } from '../../interface';

interface CategoryState {
  categories: any[]; // Utilisation du type any pour l'instant
  categoryWithArticle: ArticleAttributes[];
  // Autres propriétés de l'état
}

export const initialState: CategoryState = {
  categories: [],
  categoryWithArticle: [],
  // Initialiser les autres propriétés de l'état
};

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async () => {
    const response = await axios.get('http://localhost:3500/api/category/all');
    return response.data;
  }
);

export const fetchCategoryWithArticle = createAsyncThunk(
  'category/fetchCategoryWithArticle',
  async (id: number) => {
    const response = await axios.get(
      `http://localhost:3500/api/category/${id}`
    );
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
