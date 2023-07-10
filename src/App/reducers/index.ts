import articleReducer from './articleReducer';
import commentReducer from './commentReducer';
import userReducer from './userReducer';

const reducer = {
  articles: articleReducer,
  users: userReducer,
  comments: commentReducer,
};

export default reducer;
