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
import RecommendSection from './home/RecommendSection';

const Home = () => {
  const cardsSpeciality = [
    { title: 'Retrato', image: '/images/cardsSpeciality/foto1.png' },
    { title: 'Bodas', image: '/images/cardsSpeciality/foto2.png' },
    { title: 'Producto', image: '/images/cardsSpeciality/foto3.png' },
    { title: 'Arquitectura', image: '/images/cardsSpeciality/foto4.png' },
    { title: 'Empresarial', image: '/images/cardsSpeciality/foto5.png' },
  ];

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

      <RecommendSection />
    </main>
  );
};

export default Home;
