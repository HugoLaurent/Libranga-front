import Header from './container/Header/Header';
import Home from './container/Home/Home';
import BlogContainer from './container/BlogContainer/BlogContainer';

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
