import axios from 'axios';
import { useEffect, useState } from 'react';

import Loader from '../../components/loader/Loader';
import MostLikedArticle from '../../components/MostLikedArticle/MostLikedArticle';
import UserContainer from '../../components/UserContainer/UserContainer';
import MostRecentComment from '../../components/MostRecentComment/MostRecentComment';
import Carousel from '../../components/Carousel/Carousel';

// import './home.css';

function Home() {
  return (
    <div className="Home">
      <div className="flex flex-col items-center justify-center bg-gray-50">
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
        <div className="mt-4 flex flex-wrap items-start px-4 ">
          <Carousel />
        </div>
      </div>
      <section className="mx-10 flex flex-wrap justify-around gap-4">
        <MostLikedArticle />
        <MostRecentComment />
      </section>
      <UserContainer />
    </div>
  );
}

export default Home;
