import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

import { MangaState } from '../../interface';

function Manga() {
  const [topManga, setTopManga] = useState<MangaState>([]);

  const [paginationMin, setPaginationMin] = useState(0);
  const [paginationMax, setPaginationMax] = useState(6);

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

  useEffect(() => {
    const fetchTopManga = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/manga');
        setTopManga(response.data.data);
      } catch (error) {
        console.error(error); // Gérez les erreurs ici
      }
    };

    fetchTopManga();
  }, []);

  function handleClick() {
    console.log('click');
  }

  return (
    <div className="flex w-full flex-col items-center py-8">
      <SearchBar />
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
            <button onClick={handleClick}>Look at the articles</button>
          </div>
        ))}
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
