import { Routes, Route } from 'react-router-dom';
import Header from './container/Header/Header';
import Home from './pages/Home/Home';
import Article from './pages/Article/Article';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
