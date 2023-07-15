import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './container/Header/Header';
import Home from './pages/Home/Home';
import Article from './pages/Article/Article';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'; // Assurez-vous d'importer votre fichier CSS contenant les styles de transition
import Page404 from './pages/404/Page404';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Manga from './pages/Manga/Manga';

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/article" element={<Article />} />
            <Route path="/manga" element={<Manga />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
