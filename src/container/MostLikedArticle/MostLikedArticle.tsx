import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { articleLiked, fetchArticle } from '../../App/reducers/articleReducer';

import { ArticleAttributes } from '../../interface';

import like from '../../assets/favicon/like.png';

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

  function handleArticlesLikePlus(
    e: React.MouseEvent<HTMLButtonElement>,
    articleId: number,
    likes: number
  ) {
    e.preventDefault();
    const updatedLikes = likes + 1;
    dispatch(articleLiked({ articleId, updatedLikes }));
  }

  return (
    <>
      <div id="blog" className="bg-gray-100 px-4 py-12 xl:px-0">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl tracking-wider text-gray-900 lg:text-5xl">
            Most liked article from our Blog
          </h1>

          <div>
            <div className="flex flex-col gap-4 ">
              {followingArticles.map((article) => (
                <div key={article.article_id} className="">
                  <p className=" inset-0 flex items-center justify-center rounded-t  bg-blue-950 p-2 text-3xl font-bold text-white">
                    {article.manga}
                  </p>

                  <div className="flex w-full justify-between bg-indigo-700 px-4 py-2">
                    <p className="text-sm font-semibold tracking-wide text-white">
                      {article.pseudo}
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-white">
                      {new Date(article.created_at).toDateString()}
                    </p>
                  </div>
                  <div className="rounded-bl-3xl rounded-br-3xl bg-white px-3 py-4 lg:px-6">
                    <h1 className="text-lg font-semibold tracking-wider text-gray-900">
                      {article.title}
                    </h1>
                    <p className="mt-2 line-clamp-2 overflow-hidden text-sm text-gray-700 lg:text-base lg:leading-8">
                      {article.content}
                    </p>
                    <div className="mt-4 flex w-full cursor-pointer items-center justify-end">
                      <p className="flex items-center text-lg tracking-wide text-indigo-500">
                        {article.likes}{' '}
                        <button
                          type="button"
                          onClick={(e) =>
                            handleArticlesLikePlus(
                              e,
                              article.article_id,
                              article.likes
                            )
                          }
                        >
                          <span>
                            <img src={like} alt="like symbol" className="w-8" />
                          </span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MostLikedArticle;
