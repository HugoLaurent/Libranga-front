import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchArticle,
  fetchMainArticle,
} from '../../App/reducers/articleReducer';

import { ArticleAttributes } from '../../interface';

import like from '../../assets/favicon/like.png';

interface ImageURLs {
  [key: number]: string;
}

function MostLikedArticle() {
  const [mainArticleImageUrl, setMainArticleImageUrl] = useState('');
  const [errorDisplay, setErrorDisplay] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticle());
    dispatch(fetchMainArticle());
  }, [dispatch]);

  const mainArticle = useAppSelector(
    (state) => state.articles.mainArticle.article
  ) as ArticleAttributes;
  const pseudoMainArticle = useAppSelector(
    (state) => state.articles.mainArticle.pseudo
  ) as string;

  const articles = useAppSelector(
    (state) => state.articles.article
  ) as ArticleAttributes[];
  const articlesSorted = [...articles].sort((a, b) => b.likes - a.likes);
  const followingArticles = articlesSorted.slice(1, 3) as ArticleAttributes[];

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

  const [imageURLs, setImageURLs] = useState<ImageURLs>({});

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
          return 'Akatsuki attacked our data, coming bakc after the fight'; // Retourne une chaîne vide en cas d'erreur
        }
      })
    );

    const newImageURLs = followingArticles.reduce((acc, article, index) => {
      return { ...acc, [article.article_id]: followingArticlesUrls[index] };
    }, {});

    setImageURLs(newImageURLs);
  }

  useEffect(() => {
    if (mainArticle && articles.length > 0) {
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainArticle, articles]);

  return (
    <>
      <div id="blog" className="bg-gray-100 px-4 py-12 xl:px-0">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl tracking-wider text-gray-900 lg:text-5xl">
            Most liked article from our Blog
          </h1>
          <div className="mb-12 mb-32 lg:mt-24">
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              {mainArticle && (
                <div>
                  {!errorDisplay ? (
                    <div className="relative">
                      <img
                        className="h-64 w-full rounded-t object-cover object-center"
                        src={mainArticleImageUrl}
                        alt="computer"
                      />
                      <p className="absolute inset-0 flex items-center justify-center rounded-t bg-black bg-opacity-50 p-2 text-3xl font-bold text-white">
                        {mainArticle.manga}
                      </p>
                    </div>
                  ) : (
                    <p className=" inset-0 flex items-center justify-center rounded-t  bg-blue-950 p-2 text-3xl font-bold text-white">
                      {mainArticle.manga}
                    </p>
                  )}
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
                <div className="flex flex-col gap-4 ">
                  {followingArticles.map((article) => (
                    <div key={article.article_id} className="">
                      {!errorDisplay ? (
                        <div className="relative">
                          <img
                            className="h-64 w-full rounded-lg object-cover object-center"
                            src={imageURLs[article.article_id]}
                            alt={article.manga}
                          />
                          <p className="absolute inset-0 flex items-center justify-center rounded-t  bg-black bg-opacity-50 p-2 text-3xl font-bold text-white">
                            {article.manga}
                          </p>
                        </div>
                      ) : (
                        <p className=" inset-0 flex items-center justify-center rounded-t  bg-blue-950 p-2 text-3xl font-bold text-white">
                          {article.manga}
                        </p>
                      )}
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

export default MostLikedArticle;
