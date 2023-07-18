import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

import { MangaState } from '../../interface';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticle } from '../../App/reducers/articleReducer';
import { Link, Navigate } from 'react-router-dom';

function Manga() {
  const dispatch = useAppDispatch();
  const [topManga, setTopManga] = useState<MangaState>([]);
  const [valueOnChange, setValueOnChange] = useState('');
  const [search, setSearch] = useState('top/manga');
  const [paginationMin, setPaginationMin] = useState(0);
  const [paginationMax, setPaginationMax] = useState(6);

  const articles = useAppSelector((state) => state.articles.article);

  const [page, setPage] = useState(1);
  const topMangaSlice = topManga.slice(paginationMin, paginationMax);

  function checkPagination() {
    const paginationLimit = Math.ceil(topManga.length / 6);
    return paginationLimit;
  }

  function pagiginationPlus() {
    if (checkPagination() === page) {
      return;
    }
    setPaginationMin(paginationMin + 6);
    setPaginationMax(paginationMax + 6);
    setPage(page + 1);
    window.scrollTo(0, 0);
  }

  function pagiginationMin() {
    if (page === 1) return;
    setPaginationMin(paginationMin - 6);
    setPaginationMax(paginationMax - 6);
    setPage(page - 1);
    window.scrollTo(0, 0);
  }

  // `https://api.jikan.moe/v4/manga?q=${manga}`
  let baseUrl = 'https://api.jikan.moe/v4/top/manga';
  if (search !== 'top/manga') {
    baseUrl = `https://api.jikan.moe/v4/manga?q=${search}`;
  }

  useEffect(() => {
    const fetchTopManga = async () => {
      try {
        const response = await axios.get(baseUrl);
        setTopManga(response.data.data);
      } catch (error) {
        console.error(error); // Gérez les erreurs ici
      }
    };

    fetchTopManga();
  }, [search]);

  useEffect(() => {
    dispatch(fetchArticle());
  }, []);

  return (
    <div className="flex w-full flex-col items-center py-8">
      <div className="mb-3">
        <div className="relative  mb-4 flex w-96 flex-wrap items-stretch">
          <input
            value={valueOnChange}
            onChange={(e) => setValueOnChange(e.target.value)}
            type="search"
            className="focus:border-primary dark:focus:border-primary text-gray-800-700 relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
          />

          <button
            onClick={() => setSearch(valueOnChange)}
            className="hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-800 relative z-[2] flex items-center rounded-r bg-blue-950 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            type="button"
            id="button-addon1"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center ">
        {search !== 'top/manga' ? (
          <h1> Result for {search.toUpperCase()}</h1>
        ) : (
          <h1>TOP MANGA</h1>
        )}
        <div className="flex-wrap items-center justify-center lg:flex">
          {topMangaSlice.map((manga: any) => (
            <div
              key={manga.mal_id}
              className="mb-7 rounded bg-white p-6 shadow lg:mb-0 lg:mr-7 lg:w-4/12"
            >
              <div className="flex items-center rounded-md border-b border-gray-200 bg-blue-950 px-4 py-3">
                <img
                  src={manga.images.jpg.image_url}
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex w-full items-start justify-between">
                  <div className="w-full pl-3">
                    <p className="text-xl font-medium leading-5 text-white">
                      {manga.title}
                    </p>
                    <p className="pt-2 text-sm leading-normal text-gray-500">
                      {manga.title_japanese}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" overflow-hidden px-2">
                <p className="h-26 mb-2 line-clamp-5 py-4 text-sm leading-5 text-gray-600">
                  {manga.synopsis}
                </p>
              </div>
              <Link to={`/article/${manga.title.toLowerCase()}`}>
                Read all articles
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-5 uppercase">
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

export default Manga;
