import articleReducer from './articleReducer';
import userReducer from './userReducer';

const reducer = {
  articles: articleReducer,
  users: userReducer,
};

export default reducer;
