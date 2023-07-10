import axios from 'axios';
import { useEffect, useState } from 'react';

import Loader from '../../components/loader/Loader';
import MostLikedArticle from '../MostLikedArticle/MostLikedArticle';
import UserContainer from '../UserContainer/UserContainer';

// import './home.css';

function Home() {
  const [randomImages, setRandomImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getRandomImages() {
    try {
      const imageUrls = [];
      for (let i = 0; i < 8; i++) {
        // because the loop is controlled
        // eslint-disable-next-line no-await-in-loop
        const response = await axios.get(
          'https://api.jikan.moe/v4/random/anime'
        );
        const imageUrl = response.data.data.images.jpg.image_url;
        imageUrls.push(imageUrl);
      }
      setRandomImages(imageUrls as never);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRandomImages();
  }, []);

  return (
    <div className="Home">
      <div className="flex flex-col items-center justify-center bg-gray-50 py-20">
        <div className="w-11/12 xl:w-1/2">
          <h1 className="leading-0 text-center text-6xl font-bold text-gray-800 2xl:leading-10">
            A passion that reunite all of us
          </h1>
          <h2
            role="contentinfo"
            className="mt-5 text-center text-base leading-normal text-gray-600"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text Lorem Ipsum
            is simply dummy text of the printing
          </h2>
        </div>
        <div className="mt-4 flex flex-wrap items-start px-4  2xl:px-20">
          {isLoading ? (
            <Loader />
          ) : (
            <article className="image-hero flex h-fit">
              <div className="mt-24 flex">
                <div className="flex translate-x-10 transform items-end rounded-lg opacity-100 transition-all delay-500  duration-500">
                  <img
                    src={randomImages[0]}
                    alt="Random anime cover one"
                    className="mr-6 h-20"
                  />
                  <img
                    src={randomImages[1]}
                    alt="Random anime cover"
                    className="h-36  rounded-lg"
                  />
                </div>
                <div className="my-6 flex translate-x-5 items-center justify-end">
                  <img src={randomImages[2]} alt="Random anime cover" />
                </div>
                <div className="flex items-start">
                  <img
                    src={randomImages[3]}
                    alt="Random anime cover two"
                    className=" translate-x-7 rounded-lg"
                  />
                  <img
                    src={randomImages[4]}
                    alt="Random anime cover three"
                    className="object-fit ml-6 w-20 flex-shrink-0 -translate-x-5 rounded-lg object-cover"
                  />
                </div>
              </div>
            </article>
          )}
        </div>
        <MostLikedArticle />
        <UserContainer />
      </div>
    </div>
  );
}

export default Home;
