import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoMdSearch } from 'react-icons/io';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import CardSpeciality from '@/components/pages/home/speciality/CardSpeciality';
import CardRecommend from '@/components/pages/home/recommendations/CardRecommend';
import { useState, useEffect } from 'react';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setCurrentPage(1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getItemsPerPage = () => {
    if (windowWidth >= 1024) return 6;
    if (windowWidth >= 768) return 4;
    return 2;
  };
  const cardsSpeciality = [
    { title: 'Retrato', image: '/images/cardsSpeciality/foto1.png' },
    { title: 'Bodas', image: '/images/cardsSpeciality/foto2.png' },
    { title: 'Producto', image: '/images/cardsSpeciality/foto3.png' },
    { title: 'Arquitectura', image: '/images/cardsSpeciality/foto4.png' },
    { title: 'Empresarial', image: '/images/cardsSpeciality/foto5.png' },
  ];

  const cardsRecommend = [
    {
      title: 'Focus Photography1',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
    {
      title: 'Focus Photography2',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
    {
      title: 'Focus Photography3',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
    {
      title: 'Focus Photography4',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
    {
      title: 'Focus Photography5',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
    {
      title: 'Focus Photography6',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
    {
      title: 'Focus Photography7',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
    {
      title: 'Focus Photography8',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
    {
      title: 'Focus Photography9',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
    {
      title: 'Focus Photography10',
      image: '/images/cardRecommend/img.png',
      logoImg: '/images/cardRecommend/Avatar.png',
      category: 'Bodas',
      location: 'Buenos Aires, Argentina',
    },
  ];

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(cardsRecommend.length / itemsPerPage);

  const getCurrentItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return cardsRecommend.slice(start, end);
  };

  return (
    <main>
      <section className="relative min-h-[80svh] w-full bg-black flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[url('./images/bg.png')] bg-cover lg:bg-center opacity-70"
          aria-hidden="true"
        />

        <div className="relative z-10 container px-4 flex flex-col gap-10 items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 max-w-3xl">
            <span className="text-[#D05858]">Tu fotógrafo ideal,</span>
            <br />
            <span className="text-[#D05858]">a un clic de distancia.</span>
          </h1>

          <div className="w-full max-w-[80%] bg-[#444243] rounded-[20px] px-8 sm:px-16 py-8">
            <h3 className="text-white text-xl md:text-2xl mb-6 text-left font-bold">
              Encuentra el fotógrafo que necesitas
            </h3>

            <form className="flex flex-col md:flex-row gap-4 ">
              <Input
                type="text"
                placeholder="Especialidad del fotógrafo"
                className="flex-1 h-12 rounded-xl"
              />
              <Input
                type="text"
                placeholder="Ubicación"
                className="flex-1 h-12 rounded-xl"
              />
              <Button
                type="submit"
                className="h-12 px-8 bg-[#F69D7B] hover:bg-[#f38a61] text-white font-bold text-md rounded-xl"
              >
                <IoMdSearch />
                Buscar
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="relative min-h-[50svh] w-full bg-[#DADADA] flex flex-col">
        <div className="m-10 flex flex-col gap-12 max-w-[1500px]">
          <h3 className="font-bold text-3xl">Buscar por especialidad</h3>

          <div className="bg-[#707070] rounded-[20px] py-12 px-4 flex justify-center">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              opts={{
                align: 'start',
              }}
              className="w-11/12"
            >
              <CarouselContent className="">
                {cardsSpeciality.map((card, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <CardSpeciality title={card.title} image={card.image} />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="relative min-h-[50svh] w-full bg-[#444243] flex">
        <div className="m-10 flex flex-col gap-12 items-center">
          <h3 className="font-bold text-3xl text-white self-start">
            Recomendaciones para ti
          </h3>
          <Carousel>
            <CarouselContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {getCurrentItems().map((card, index) => {
                return (
                  <CarouselItem key={index} className=" ">
                    <CardRecommend card={card} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === index + 1
                    ? 'bg-orange-400 text-white'
                    : 'bg-gray-600 text-white hover:bg-gray-500'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
