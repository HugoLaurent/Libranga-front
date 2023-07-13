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

  console.log(articles);

  return (
    <>
      <div className="flex-2 px-4 py-12 xl:px-0">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl tracking-wider text-gray-900 lg:text-4xl">
            All articles
          </h1>

          <div>
            <div className="flex flex-col gap-4">
              {category === 0 ? (
                articles.map((article) => (
                  <div>
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
                    {article.Comments.map((comment) => (
                      <div key={comment.comment_id} className="shadow-lg">
                        <ModelComment
                          article_id={comment.comment_id}
                          pseudo={article.pseudo}
                          date={comment.created_at}
                          title={comment.title}
                          content={comment.content}
                          likes={comment.likes}
                        />
                      </div>
                    ))}
                  </div>
                ))
              ) : articlesChoosen && articlesChoosen.length > 0 ? (
                articlesChoosen.map((article) => (
                  <div>
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
                          title={comment.title}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllArticles;
