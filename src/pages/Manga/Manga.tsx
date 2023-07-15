import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticleByName } from '../../App/reducers/articleReducer';

function Manga() {
  const dispatch = useAppDispatch();
  const [topManga, setTopManga] = useState([]);

  const selectedManga = useAppSelector((state) => state.articles?.article);

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

  console.log(topManga);

  return (
    <div className="w-full py-8">
      <div className="flex-wrap items-center justify-center lg:flex">
        {topManga.map((manga) => (
          <div
            key={manga.mal_id}
            className="mb-7 rounded bg-white p-6 shadow lg:mb-0 lg:mr-7 lg:w-4/12"
          >
            <div className="flex items-center border-b border-gray-200 pb-6">
              <img
                src={manga.images.jpg.image_url}
                className="h-12 w-12 rounded-full"
              />
              <div className="flex w-full items-start justify-between">
                <div className="w-full pl-3">
                  <p className="text-xl font-medium leading-5 text-gray-800">
                    {manga.title}
                  </p>
                  <p className="pt-2 text-sm leading-normal text-gray-500">
                    {manga.title_japanese}
                  </p>
                </div>
              </div>
            </div>
            <div className=" overflow-hiddenpx-2">
              <p className="mb-2 line-clamp-5 h-14 py-4 text-sm leading-5 text-gray-600">
                {manga.synopsis}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Manga;
