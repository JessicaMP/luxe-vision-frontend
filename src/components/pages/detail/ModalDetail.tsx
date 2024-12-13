import { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const ModalDetail = ({ open, setOpen, studio }: any) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [api, setApi] = useState();

  const totalPhotos = studio?.portfolioPhotos?.length || 0;

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentPage(api.selectedScrollSnap());
    });

    // Actualizar la posición del carrusel cuando cambia currentPage
    api.scrollTo(currentPage);
  }, [api, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage(totalPhotos - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPhotos - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(0);
    }
  };

  const handleImageClick = (index) => {
    setCurrentPage(index);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: "80vw", // Ancho del fondo
          height: "80vh", // Altura del fondo
          borderRadius: "md",
          p: 2, // Reducir el padding del fondo
          boxShadow: "lg",
        }}
        className="flex justify-center items-center h-max"
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />

        <div className="flex flex-col gap-6 justify-center items-center w-full h-full">
          {/* Imagen principal */}
          <div className="w-full h-full max-h-[60vh] flex justify-center items-center relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPage}
                src={studio.portfolioPhotos[currentPage]?.image}
                alt="logo"
                className="max-w-full max-h-full object-contain rounded-lg absolute"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              />
            </AnimatePresence>
          </div>

          {/* Carrusel de miniaturas */}
          <div className="flex items-center justify-center gap-4 w-full">
            <button
              onClick={handlePrevious}
              className="bg-[#D05858] p-1 md:p-2 rounded-full shadow-lg hover:bg-white"
            >
              <MdNavigateBefore className="text-white size-8 hover:text-[#D05858]" />
            </button>
            <Carousel
              className="w-[50%]"
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
                dragFree: false,
              }}
            >
              <CarouselContent>
                {studio.portfolioPhotos.map((photo: any, index: number) => (
                  <CarouselItem
                    key={photo.id}
                    className="basis-1/5 cursor-pointer max-sm:basis-1/2"
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="relative w-full pb-[100%]">
                      {" "}
                      <img
                        src={photo.image}
                        alt={`Imagen ${index + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-300"
                        style={{
                          opacity: index === currentPage ? 1 : 0.7,
                        }}
                        draggable={false}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <button
              onClick={handleNext}
              className="bg-[#D05858] p-1 md:p-2 rounded-full shadow-lg hover:bg-white"
            >
              <MdNavigateNext className="text-white size-8 hover:text-[#D05858]" />
            </button>
          </div>
        </div>
      </Sheet>
    </Modal>
  );
};

export default ModalDetail;
