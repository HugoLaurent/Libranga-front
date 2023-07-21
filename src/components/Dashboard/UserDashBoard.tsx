import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteArticle,
  fetchArticle,
  modifyContentArticle,
  modifyTitleArticle,
} from '../../App/reducers/articleReducer';
import { useAppSelector } from '../../hooks/redux';
import ModelArticle from '../ModelArticle/ModelArticle';
import ModelComment from '../ModelComment/ModelComment';
import UserArticles from './UserDashBoardComponents/UserArticles';

function UserDashBoard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticle());
  }, [dispatch]);
  const articles = useAppSelector((state) => state.articles.article);
  const userId = useAppSelector((state) => state.users.userId);

  const articleByUser = articles.filter(
    (article) => article.user_id === userId
  );

  const [paginationMin, setPaginationMin] = useState(0);
  const [paginationMax, setPaginationMax] = useState(3);

  const [page, setPage] = useState(1);

  const articleSlice = articleByUser.slice(paginationMin, paginationMax);

  function pagiginationPlus() {
    if (checkPagination() === page) {
      return;
    }
    setPaginationMin(paginationMin + 3);
    setPaginationMax(paginationMax + 3);
    setPage(page + 1);
    window.scrollTo(0, 0);
  }

  function pagiginationMin() {
    if (page === 1) return;
    setPaginationMin(paginationMin - 3);
    setPaginationMax(paginationMax - 3);
    setPage(page - 1);
    window.scrollTo(0, 0);
  }

  function checkPagination() {
    const paginationLimit = Math.ceil(articles.length / 3);
    return paginationLimit;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const articleToDelete = e.currentTarget.articleToDelete.value;
    console.log(articleToDelete);
    dispatch(deleteArticle(articleToDelete));
  }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    if (title.trim() === '') {
      return;
    }
    const articleId = e.currentTarget.titleToChange.value;
    dispatch(modifyTitleArticle({ articleId, title: title }));
  }
  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    if (content.trim() === '') {
      return;
    }
    const articleId = e.currentTarget.contentToChange.value;
    dispatch(modifyContentArticle({ articleId, content: content }));
  }

  return (
    <>
      <h1 className="text-center font-mainFont text-3xl font-bold">
        User Dashboard
      </h1>
      <UserArticles />
    </>
  );
}

export default UserDashBoard;
