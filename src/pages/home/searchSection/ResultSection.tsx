import { useEffect, useState } from "react";
import CardRecommend from "@/components/pages/home/recommendations/CardRecommend";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Studio } from "@/types/studio";
import { AvailabilityDTO } from "@/types/availability";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface SearchResultsProps {
  searchParams: AvailabilityDTO;
}

export default function ResultSection({ searchParams }: SearchResultsProps) {
  const studios = useSelector(
    (state: RootState) => state.availability.availableStudios
  ) as Studio[];
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const getItemsPerPage = () => {
    if (windowWidth >= 1024) return 9; // Show 3x3 grid on large screens
    if (windowWidth >= 768) return 6; // Show 2x3 grid on medium screens
    return 4; // Show 2x2 grid on small screens
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(studios.length / itemsPerPage);

  const getCurrentItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return studios.slice(start, end);
  };

  const currentItems = getCurrentItems();

  if (studios.length === 0) {
    return (
      <div className="min-h-[20vh] w-full bg-[#444243] flex items-center justify-center rounded-md">
        <p className="text-white text-xl min-w-[50vw] ">
          No studios found matching your criteria
        </p>
      </div>
    );
  }

  return (
    <section className="w-full bg-[#444243] rounded-lg">
      <div className="container mx-auto">
        <div className="px-4 sm:px-10 py-10 flex flex-col gap-12 items-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Photographic studios available for{" "}
            {searchParams.date
              ? (() => {
                  const date = new Date(searchParams.date);
                  date.setDate(date.getDate() + 1);
                  return date.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });
                })()
              : ""}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentItems.map((studio) => (
              <CardRecommend key={studio.id} studio={studio} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 text-white"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === index + 1
                    ? "bg-[#F69D7B] text-white"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                }`}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 text-white"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
