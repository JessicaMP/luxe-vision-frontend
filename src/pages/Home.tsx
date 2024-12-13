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
import SearchSection from "./SearchSection";
import { useDispatch, useSelector } from "react-redux";
import { bookingSlice } from "@/reducers/bookingReducer";
import { RootState } from "@/store";
import { Specialty } from "@/types/specialty";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  const cardsSpeciality: Specialty[] = useSelector(
    (state: RootState) => state.specialties.specialties
  );

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    dispatch(bookingSlice.actions.clearQuote());
  }, [dispatch]);

  return (
    <main>
      <section
        id="search-section"
        className="relative sm:min-h-[80svh] bg-black py-20 sm:py-0 mt-14 md:mt-20 w-full flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-[url('/images/bg.webp')] bg-cover lg:bg-center opacity-70"
          aria-hidden="true"
        />

        <div className="relative z-10 text-center w-full flex flex-col items-center gap-8 sm:gap-12 mt-0 md:mt-14 pb-8 md:pb-20 px-4 md:px-0">
          <h1 className="text-4xl md:text-5xl lg:text-[55px] font-bold md:leading-relaxed leading-normal mb-4 sm:mb-6 max-w-3xl text-[#D05858] ">
            <span className="text-[#D05858] ">Your ideal photographer,</span>
            <br />
            <span className="text-[#D05858]">just a click away</span>
          </h1>

          <SearchSection />
        </div>
      </section>

      <section
        id="category-section"
        className="relative w-full bg-[#DADADA] flex flex-col py-6"
      >
        <div className="container mx-auto">
          <div className="px-4 sm:px-10 py-10 flex flex-col gap-12 max-w-[1500px] ">
            <h3 className="font-bold text-3xl">Search by Specialty </h3>

            <div className="bg-[#707070] rounded-[20px] py-12 px-4 flex justify-center">
              {cardsSpeciality && cardsSpeciality.length > 0 && (
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
                          <CardSpeciality
                            title={card.specialtyName}
                            image={card.image}
                          />
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </section>

      <RecommendSection />
    </main>
  );
};

export default Home;
