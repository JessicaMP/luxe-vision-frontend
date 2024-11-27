import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CardSpeciality from "@/components/pages/home/speciality/CardSpeciality";
import RecommendSection from "./home/RecommendSection";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectStudios } from "@/selectors/studioSelector";
import { fetchStudiosAPI } from "@/reducers/studiosReducer";
import { AppDispatch } from "@/store";
import SearchSection from "./home/SearchSection";

const Home = () => {
  const cardsSpeciality = [
    { title: "Portrait", image: "/images/cardsSpeciality/foto1.png" },
    { title: "Wedding", image: "/images/cardsSpeciality/foto2.png" },
    { title: "Product", image: "/images/cardsSpeciality/foto3.png" },
    { title: "Architecture", image: "/images/cardsSpeciality/foto4.png" },
    { title: "Business", image: "/images/cardsSpeciality/foto5.png" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const studios = useSelector(selectStudios);

  useEffect(() => {
    if (studios.length === 0) {
      dispatch(fetchStudiosAPI());
    }
  }, [dispatch, studios.length]);

  return (
    <main>
      <section
        id="search-section"
        className="relative sm:min-h-[80svh] w-full bg-black flex items-center justify-center py-20 sm:py-0 mt-10"
      >
        <div
          className="absolute inset-0 bg-[url('./images/bg.png')] bg-cover lg:bg-center opacity-70"
          aria-hidden="true"
        />

        <SearchSection />
      </section>

      <section
        id="category-section"
        className="relative min-h-[50svh] w-full bg-[#DADADA] flex flex-col"
      >
        <div className="container mx-auto">
          <div className="px-4 sm:px-10 py-10 flex flex-col gap-12 max-w-[1500px] ">
            <h3 className="font-bold text-3xl">Search by Specialty </h3>

            <div className="bg-[#707070] rounded-[20px] py-12 px-4 flex justify-center">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                opts={{
                  align: "start",
                }}
                className="w-11/12"
              >
                <CarouselContent className="">
                  {cardsSpeciality.map((card, index) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4"
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
        </div>
      </section>

      <RecommendSection />
    </main>
  );
};

export default Home;
