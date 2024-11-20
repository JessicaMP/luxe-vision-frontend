import CardRecommend from "@/components/pages/home/recommendations/CardRecommend";

import { useState, useEffect } from "react";
import useRandomStudios from "@/hooks/useRandomStudios";

const RecommendSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { data: studios, status, error } = useRandomStudios();

  const getItemsPerPage = () => {
    if (windowWidth >= 1024) return 6;
    if (windowWidth >= 768) return 4;
    return 2;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (status === "loading") return <p>Cargando estudios...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(studios.length / itemsPerPage);

  const getCurrentItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return Array.isArray(studios) ? studios.slice(start, end) : [];
  };

  const currentItems = getCurrentItems() || [];

  if (currentItems.length === 0) return <p>No hay estudios recomendados</p>;

  return (
    <section
      id="recommendations-section"
      className="relative min-h-[50svh] w-full bg-[#444243] flex"
    >
      <div className="container mx-auto">
        <div className="px-4 sm:px-10 py-10 flex flex-col gap-12 items-center">
          <h3 className="font-bold text-3xl text-white self-start">
            Recommendations for you
          </h3>
          <div>
            <div
              id="grid-recommendations"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8"
            >
              {currentItems.map(
                (studio) =>
                  studio != undefined && (
                    <CardRecommend key={studio.id} studio={studio} />
                  )
              )}
            </div>
          </div>

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
                    ? "bg-orange-400 text-white"
                    : "bg-gray-600 text-white hover:bg-gray-500"
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
      </div>
    </section>
  );
};

export default RecommendSection;
