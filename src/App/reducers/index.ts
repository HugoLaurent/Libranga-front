import articleReducer from './articleReducer';
import commentReducer from './commentReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';

const reducer = {
  articles: articleReducer,
  users: userReducer,
  comments: commentReducer,
  categories: categoryReducer,
};

export default reducer;
