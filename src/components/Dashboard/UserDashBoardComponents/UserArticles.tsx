import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteArticle,
  fetchArticle,
  modifyContentArticle,
  modifyTitleArticle,
} from '../../../App/reducers/articleReducer';
import { useAppSelector } from '../../../hooks/redux';
import ModelArticle from '../../ModelArticle/ModelArticle';
import ModelComment from '../../ModelComment/ModelComment';

function UserArticles() {
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
    setTitle('');
  }
  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    if (content.trim() === '') {
      return;
    }
    const articleId = e.currentTarget.contentToChange.value;
    dispatch(modifyContentArticle({ articleId, content: content }));
    setContent('');
  }
  return (
    <div className=" flex w-full flex-col items-center rounded-md border border-secondary px-4 py-12 shadow-md xl:px-0">
      <h1 className="font-mainFont text-3xl">Your Articles</h1>
      <section className="flex flex-wrap">
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="m-4 flex flex-col items-center"
          >
            <p className="text-lg">I'd like to delete the article number:</p>
            <select
              name="articleToDelete"
              id="articleToDelete"
              className="mt-2 rounded-md border p-2"
            >
              {articleByUser?.map((article) => (
                <option key={article.article_id} value={article.article_id}>
                  {article.article_id}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="mt-4 rounded bg-primary px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </form>
        </div>
        <div className="flex justify-center">
          <form
            onSubmit={handleTitleChange}
            className="m-4 flex flex-col items-center"
          >
            <p className="text-lg">I want to modify the article number:</p>
            <select
              defaultValue=""
              name="titleToChange"
              className="mt-2 rounded-md border p-2"
            >
              <option value="" disabled>
                Select an article to modify
              </option>
              {articleByUser?.map((article) => (
                <option key={article.article_id} value={article.article_id}>
                  {article.article_id}
                </option>
              ))}
            </select>
            <p className="mt-4 text-lg">Title:</p>
            <textarea
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="content"
              name="content"
              aria-labelledby="content"
              className="h-fit w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
              placeholder="Change your title"
            ></textarea>
            <button
              type="submit"
              className="mt-4 rounded bg-secondary px-4 py-2 font-bold text-white hover:bg-blue-600/50"
            >
              Change
            </button>
          </form>
        </div>
        <div className="flex justify-center">
          <form
            onSubmit={handleContentChange}
            className="m-4 flex flex-col items-center"
          >
            <p className="text-lg">I want to modify the article content:</p>
            <select
              defaultValue=""
              name="contentToChange"
              className="mt-2 rounded-md border p-2"
            >
              <option value="" disabled>
                Select an article to modify
              </option>
              {articleByUser?.map((article) => (
                <option key={article.article_id} value={article.article_id}>
                  {article.article_id}
                </option>
              ))}
            </select>
            <p className="mt-4 text-lg">Content:</p>
            <textarea
              required
              value={content}
              id="content"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              aria-labelledby="content"
              className="h-fit w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
              placeholder="Change your article"
            ></textarea>
            <button
              type="submit"
              className="mt-4 rounded bg-secondary px-4 py-2 font-bold text-white hover:bg-blue-700/50"
            >
              Change
            </button>
          </form>
        </div>
      </section>

      <div className="flex w-full flex-wrap gap-4 sm:justify-center ">
        {articleSlice?.map((article) => (
          <div key={article.article_id} className="sm:w-96 md:w-1/4">
            <ModelArticle
              article_id={article.article_id}
              manga={article.manga}
              url={article.url}
              pseudo={article.pseudo}
              date={article.created_at}
              title={article.title}
              content={article.content}
              likes={article.likes}
            />
            <div className="flex flex-col flex-wrap">
              {article.Comments?.map((comment) => (
                <div key={comment.comment_id} className=" flex shadow-lg">
                  <ModelComment
                    article_id={comment.comment_id}
                    pseudo={article.pseudo}
                    date={comment.created_at}
                    content={comment.content}
                    likes={comment.likes}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-5 uppercase">
        <button className="uppercase" onClick={pagiginationMin}>
          down
        </button>
        <p type="button" className=" text-3xl">
          {page}
        </p>
        <button className="uppercase" onClick={pagiginationPlus}>
          up
        </button>
      </div>
    </div>
  );
}

export default UserArticles;
