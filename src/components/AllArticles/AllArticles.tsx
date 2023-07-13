import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticle } from '../../App/reducers/articleReducer';

import { ArticleAttributes } from '../../interface';
import { fetchCategoryWithArticle } from '../../App/reducers/categoryReducer';
import ModelArticle from '../ModelArticle/ModelArticle';
import ModelComment from '../ModelComment/ModelComment';

function AllArticles({
  category,
  stateChange,
}: {
  category: Number;
  stateChange: Boolean;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    category === 0
      ? dispatch(fetchArticle())
      : dispatch(fetchCategoryWithArticle(category));
  }, [dispatch, stateChange, category]);

  const articles = useAppSelector(
    (state) => state.articles.article
  ) as ArticleAttributes[];

  const articlesChoosen = useAppSelector(
    (state) => state.categories.categoryWithArticle.Articles
  ) as ArticleAttributes[];

  const [paginationMin, setPaginationMin] = useState(0);
  const [paginationMax, setPaginationMax] = useState(6);

  const [page, setPage] = useState(1);

  const articleSlice = articles.slice(paginationMin, paginationMax);
  const articlesChoosenSlice = articlesChoosen.slice(
    paginationMin,
    paginationMax
  );

  function pagiginationPlus() {
    setPaginationMin(paginationMin + 6);
    setPaginationMax(paginationMax + 6);
    setPage(page + 1);
  }

  function pagiginationMin() {
    if (page === 1) return;
    setPaginationMin(paginationMin - 6);
    setPaginationMax(paginationMax - 6);
    setPage(page - 1);
  }

  return (
    <>
      <div className="w-full px-4 py-12 xl:px-0">
        <h1 className="text-center text-3xl tracking-wider text-gray-900 lg:text-4xl">
          All articles
        </h1>

        <div className="flex w-full flex-wrap gap-4 sm:justify-center ">
          {category === 0 ? (
            articleSlice.map((article) => (
              <div className="md:min-[20%]: sm:w-96 md:w-1/4">
                <ModelArticle
                  key={article.article_id}
                  article_id={article.article_id}
                  manga={article.manga}
                  pseudo={article.pseudo}
                  date={article.created_at}
                  title={article.title}
                  content={article.content}
                  likes={article.likes}
                />
                <div className="flex flex-col flex-wrap">
                  {article.Comments.map((comment) => (
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
            ))
          ) : articlesChoosenSlice && articlesChoosenSlice.length > 0 ? (
            articlesChoosenSlice.map((article) => (
              <div className="w-1/3">
                <ModelArticle
                  key={article.article_id}
                  article_id={article.article_id}
                  manga={article.manga}
                  pseudo={article.User.pseudo}
                  date={article.created_at}
                  title={article.title}
                  content={article.content}
                  likes={article.likes}
                />
                {article.Comments.map((comment) => (
                  <div key={comment.comment_id} className="shadow-lg">
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
            ))
          ) : (
            <p className="border p-5 text-3xl shadow-lg ">
              Be the first Librangaka to write an article !{' '}
            </p>
          )}{' '}
        </div>
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
    </>
  );
}

export default AllArticles;
