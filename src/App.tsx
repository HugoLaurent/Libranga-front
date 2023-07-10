import Header from './container/Header/Header';
import Home from './container/Home/Home';
import MostLikedArticle from './container/MostLikedArticle/MostLikedArticle';
import UserContainer from './container/UserContainer/UserContainer';

function App() {
  return (
    <div className="text-center">
      <Header />
      <Home />
      <MostLikedArticle />
      <UserContainer />
    </div>
  );
}

export default App;
