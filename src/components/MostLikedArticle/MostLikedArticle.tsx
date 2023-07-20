import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticle } from '../../App/reducers/articleReducer';

import { ArticleAttributes } from '../../interface';

import ModelArticle from '../ModelArticle/ModelArticle';

function MostLikedArticle() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticle());
  }, [dispatch]);

  const articles = useAppSelector(
    (state) => state.articles.article
  ) as ArticleAttributes[];
  const articlesSorted = [...articles].sort((a, b) => b.likes - a.likes);
  const followingArticles = articlesSorted.slice(0, 3) as ArticleAttributes[];
  console.log(followingArticles);

  return (
    <>
      <div className="px-4 py-12 xl:px-0">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl tracking-wider text-gray-900 lg:text-4xl">
            Most liked article
          </h1>

          <div>
            <div className="flex flex-wrap gap-4 ">
              {followingArticles.map((article) => (
                <ModelArticle
                  key={article.article_id}
                  url={article.url}
                  article_id={article.article_id}
                  manga={article.manga}
                  pseudo={article.pseudo}
                  date={article.created_at}
                  title={article.title}
                  content={article.content}
                  likes={article.likes}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MostLikedArticle;
