import React, { useEffect, useState } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import axios from 'axios';
import Loader from '../loader/Loader';

/* Install pure-react-carousel using -> npm i pure-react-carousel */

function Carousel() {
  const [randomImages, setRandomImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const onMobile = window.innerWidth < 768;

  async function getRandomImages() {
    try {
      const imageUrls = [];
      for (let i = 0; i < 8; i += 1) {
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
    <div className="container mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-4  ">
          {/* Carousel for desktop and large size devices */}
          <CarouselProvider
            className="hidden lg:block"
            naturalSlideWidth={100}
            isIntrinsicHeight={true}
            totalSlides={8}
            isPlaying={true}
            interval={1000}
            visibleSlides={8}
            step={1}
            infinite={true}
          >
            <div className="relative flex w-full items-center justify-center">
              <div className="mx-auto h-full w-full overflow-x-hidden overflow-y-hidden">
                <Slider>
                  <div
                    id="slider"
                    className="flex h-full items-center justify-start gap-14 transition duration-700 ease-out md:gap-6 lg:gap-8"
                  >
                    <Slide Carousel={0}>
                      <img src={randomImages[0]} alt="Random anime cover one" />
                    </Slide>
                    <Slide Carousel={1}>
                      <img src={randomImages[1]} alt="Random anime cover two" />
                    </Slide>
                    <Slide Carousel={2}>
                      <img
                        src={randomImages[2]}
                        alt="Random anime cover three"
                      />
                    </Slide>
                    <Slide Carousel={3}>
                      <img src={randomImages[3]} alt="Random anime cover for" />
                    </Slide>
                    <Slide Carousel={4}>
                      <img
                        src={randomImages[4]}
                        alt="Random anime cover five"
                      />
                    </Slide>
                    <Slide Carousel={5}>
                      <img src={randomImages[5]} alt="Random anime cover six" />
                    </Slide>
                    <Slide Carousel={6}>
                      <img
                        src={randomImages[6]}
                        alt="Random anime cover seven"
                      />
                    </Slide>
                    <Slide Carousel={7}>
                      <img
                        src={randomImages[7]}
                        alt="Random anime cover eigth"
                      />
                    </Slide>
                  </div>
                </Slider>
              </div>
            </div>
          </CarouselProvider>

          {/* Carousel for tablet and medium size devices */}
          <CarouselProvider
            className="hidden md:block lg:hidden"
            naturalSlideWidth={100}
            isIntrinsicHeight={true}
            totalSlides={8}
            isPlaying={true}
            interval={1000}
            visibleSlides={2}
            step={1}
            infinite={true}
          >
            <div className="relative flex w-full items-center justify-center">
              <div className="mx-auto h-full w-full overflow-x-hidden overflow-y-hidden">
                <Slider>
                  <div
                    id="slider"
                    className="flex h-full items-center justify-start gap-14 transition duration-700 ease-out md:gap-6 lg:gap-8"
                  >
                    <Slide Carousel={0}>
                      <img src={randomImages[0]} alt="Random anime cover one" />
                    </Slide>
                    <Slide Carousel={1}>
                      <img src={randomImages[1]} alt="Random anime cover two" />
                    </Slide>
                    <Slide Carousel={2}>
                      <img
                        src={randomImages[2]}
                        alt="Random anime cover three"
                      />
                    </Slide>
                    <Slide Carousel={3}>
                      <img src={randomImages[3]} alt="Random anime cover for" />
                    </Slide>
                    <Slide Carousel={4}>
                      <img
                        src={randomImages[4]}
                        alt="Random anime cover five"
                      />
                    </Slide>
                    <Slide Carousel={5}>
                      <img src={randomImages[5]} alt="Random anime cover six" />
                    </Slide>
                    <Slide Carousel={6}>
                      <img
                        src={randomImages[6]}
                        alt="Random anime cover seven"
                      />
                    </Slide>
                    <Slide Carousel={7}>
                      <img
                        src={randomImages[7]}
                        alt="Random anime cover eigth"
                      />
                    </Slide>
                  </div>
                </Slider>
              </div>
            </div>
          </CarouselProvider>

          {/* Carousel for mobile and Small size Devices */}
          <CarouselProvider
            className="block md:hidden "
            naturalSlideWidth={100}
            isIntrinsicHeight={true}
            totalSlides={5}
            isPlaying={true}
            interval={3000}
            visibleSlides={1}
            step={1}
          >
            <div className="relative flex w-full items-center justify-center">
              <div className="mx-auto h-full w-full overflow-x-hidden overflow-y-hidden">
                <Slider>
                  <div
                    id="slider"
                    className="flex h-full items-center justify-start gap-14 transition duration-700 ease-out md:gap-6 lg:gap-8"
                  >
                    <Slide Carousel={0}>
                      <img src={randomImages[0]} alt="Random anime cover one" />
                    </Slide>
                    <Slide Carousel={1}>
                      <img src={randomImages[1]} alt="Random anime cover two" />
                    </Slide>
                    <Slide Carousel={2}>
                      <img
                        src={randomImages[2]}
                        alt="Random anime cover three"
                      />
                    </Slide>
                    <Slide Carousel={3}>
                      <img src={randomImages[3]} alt="Random anime cover for" />
                    </Slide>
                    <Slide Carousel={4}>
                      <img
                        src={randomImages[4]}
                        alt="Random anime cover five"
                      />
                    </Slide>
                    <Slide Carousel={5}>
                      <img src={randomImages[5]} alt="Random anime cover six" />
                    </Slide>
                    <Slide Carousel={6}>
                      <img
                        src={randomImages[6]}
                        alt="Random anime cover seven"
                      />
                    </Slide>
                    <Slide Carousel={7}>
                      <img
                        src={randomImages[7]}
                        alt="Random anime cover eigth"
                      />
                    </Slide>
                  </div>
                </Slider>
              </div>
            </div>
          </CarouselProvider>
        </div>
      )}
    </div>
  );
}

export default Carousel;
