import Header from './container/Header/Header';
import Home from './container/Home/Home';
import BlogContainer from './container/BlogContainer/BlogContainer';
import UserContainer from './container/UserContainer/UserContainer';

function App() {
  return (
    <div className="text-center">
      <Header />
      <Home />
      <BlogContainer />
      <UserContainer />
    </div>
  );
}

export default App;
