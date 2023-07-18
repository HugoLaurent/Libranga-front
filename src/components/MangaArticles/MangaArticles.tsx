import { useParams } from 'react-router-dom';
import ModelArticle from '../ModelArticle/ModelArticle';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticle } from '../../App/reducers/articleReducer';
import ModelComment from '../ModelComment/ModelComment';

function MangaArticles() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticle());
  }, []);

  const { id } = useParams<{ id: string }>();
  console.log(id);

  const articles = useAppSelector((state) => state.articles.article);
  console.log(articles);

  const filteredArticles = articles.filter((article) =>
    article.manga.toLowerCase().includes(id)
  );
  console.log(filteredArticles);

  return (
    <div className="w-full px-4 py-12 xl:px-0">
      <h1 className="text-center text-3xl tracking-wider text-gray-900 lg:text-4xl">
        All articles
      </h1>

      <div className="flex w-full flex-wrap gap-4 sm:justify-center">
        {filteredArticles.map((filteredArticle) => (
          <div
            key={filteredArticle.article_id}
            className="md:min-[40%] sm:w-96 md:w-1/2"
          >
            <ModelArticle
              article_id={filteredArticle.article_id}
              manga={filteredArticle.manga}
              url={filteredArticle.url}
              pseudo={filteredArticle.pseudo}
              date={filteredArticle.created_at}
              title={filteredArticle.title}
              content={filteredArticle.content}
              likes={filteredArticle.likes}
            />
            <div className="flex flex-col flex-wrap">
              {filteredArticle.Comments.map((comment) => (
                <div key={comment.comment_id} className="flex shadow-lg">
                  <ModelComment
                    comment_id={comment.comment_id}
                    pseudo={comment.pseudo}
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
    </div>
  );
}

export default MangaArticles;
