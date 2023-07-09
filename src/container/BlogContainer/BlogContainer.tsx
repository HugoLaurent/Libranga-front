import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchArticle,
  fetchMainArticle,
} from '../../App/reducers/articleReducer';

import like from '../../assets/favicon/like.png';

function BlogContainer() {
  const [mainArticleImageUrl, setMainArticleImageUrl] = useState('');
  const [errorDisplay, setErrorDisplay] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticle());
    dispatch(fetchMainArticle());
  }, [dispatch]);

  const mainArticle = useAppSelector(
    (state) => state.articles.mainArticle.article
  );
  const pseudoMainArticle = useAppSelector(
    (state) => state.articles.mainArticle.pseudo
  );

  const articles = useAppSelector((state) => state.articles.article);
  const articlesSorted = [...articles].sort((a, b) => b.likes - a.likes);
  const followingArticles = articlesSorted.slice(1, 3);
  console.log(followingArticles);

  async function getImageForMainArticle(manga: string) {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${manga}&sfw`
      );
      setMainArticleImageUrl(response.data.data[0].images.jpg.large_image_url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (mainArticle) {
      getImageForMainArticle(mainArticle.manga);
    }
  }, [mainArticle]);

  const [imageURLs, setImageURLs] = useState({});

  async function fetchImages() {
    const followingArticlesUrls = await Promise.all(
      followingArticles.map(async (article) => {
        try {
          const response = await axios.get(
            `https://api.jikan.moe/v4/anime?q=${article.manga}&sfw`
          );
          return response.data.data[0].images.jpg.image_url;
        } catch (error) {
          setErrorDisplay(true);
          return ''; // Retourne une chaîne vide en cas d'erreur
        }
      })
    );

    setImageURLs({});
    followingArticles.forEach((article, index) => {
      imageURLs[article.article_id] = followingArticlesUrls[index];
    });

    setImageURLs(imageURLs);
  }

  useEffect(() => {
    if (mainArticle && articles.length > 0) {
      fetchImages();
    }
  }, [mainArticle, articles]);

  return (
    <>
      <div id="blog" className="bg-gray-100 px-4 py-12 xl:px-0">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl tracking-wider text-gray-900 lg:text-5xl">
            Most liked article from our Blog
          </h1>
          <div className="mt-12 lg:mt-24">
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              {mainArticle && (
                <div>
                  <img
                    className="h-64 w-full rounded-lg object-cover object-center"
                    src={mainArticleImageUrl}
                    alt="computer"
                  />
                  <div className="flex w-full justify-between bg-indigo-700 px-8 py-4">
                    <p className="text-sm font-semibold tracking-wide text-white">
                      {pseudoMainArticle}
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-white">
                      {new Date(mainArticle.created_at).toDateString()}
                    </p>
                  </div>
                  <div className="rounded-bl-3xl rounded-br-3xl bg-white px-10 py-6">
                    <h1 className="text-4xl font-semibold tracking-wider text-gray-900">
                      {mainArticle.title}
                    </h1>
                    <p className="mt-6 w-11/12 text-base  tracking-wide text-gray-700 lg:text-lg lg:leading-8">
                      {mainArticle.content}
                    </p>
                    <div className="mt-4 flex w-full cursor-pointer items-center justify-end">
                      <p className="flex items-center text-lg tracking-wide text-indigo-500">
                        {mainArticle.likes}{' '}
                        <span>
                          <img src={like} alt="like symbol" className="w-8" />
                        </span>
                      </p>
                    </div>
                    <div className="h-5 w-2" />
                  </div>
                </div>
              )}
              <div>
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                  {followingArticles.map((article) => (
                    <div key={article.article_id}>
                      <img
                        className="h-64 w-full rounded-lg object-cover object-center"
                        src={imageURLs[article.article_id]}
                        alt="games"
                      />

                      <div className="flex w-full justify-between bg-indigo-700 px-4 py-2">
                        <p className="text-sm font-semibold tracking-wide text-white">
                          {article.pseudo}
                        </p>
                        <p className="text-sm font-semibold tracking-wide text-white">
                          {new Date(article.created_at).toDateString()}
                        </p>
                      </div>
                      <div className="rounded-bl-3xl rounded-br-3xl  bg-white px-3 py-4 lg:px-6">
                        <h1 className="text-lg font-semibold tracking-wider text-gray-900">
                          {article.title}
                        </h1>
                        <p className="mt-2 text-ellipsis pr-4 text-sm  tracking-wide text-gray-700 lg:text-base lg:leading-8">
                          {article.content}
                        </p>
                        <div className="mt-4 flex w-full cursor-pointer items-center justify-end">
                          <p className="flex items-center text-lg tracking-wide text-indigo-500">
                            {article.likes}{' '}
                            <span>
                              <img
                                src={like}
                                alt="like symbol"
                                className="w-8"
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogContainer;
