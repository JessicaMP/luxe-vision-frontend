import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const ModalDetail = ({ open, setOpen, studio }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [api, setApi] = React.useState();

  const totalPhotos = studio?.portfolioPhotos?.length || 0;

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
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

  const handleImageClick = (index: number) => {
    setCurrentPage(index);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: '100vw',
          borderRadius: 'md',
          p: 6,
          boxShadow: 'lg',
          height: '70svh',
        }}
        className="flex justify-center items-center h-max"
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />

        <div className="flex flex-col gap-10 h-[70svh] justify-center items-center">
          <div className="w-4/9">
            <img
              src={studio.portfolioPhotos[currentPage]?.image}
              alt="logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevious}
              className=" bg-[#D05858] p-1 md:p-2 rounded-full shadow-lg hover:bg-white"
            >
              <MdNavigateBefore className="text-white size-8 hover:text-[#D05858]" />
            </button>
            <Carousel
              className="w-[50%] h-full"
              setApi={setApi}
              opts={{
                align: 'start',
                loop: true,
                skipSnaps: false,
                dragFree: false,
              }}
            >
              <CarouselContent>
                {studio.portfolioPhotos.map((photo, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/5 cursor-pointer h-min max-sm:basis-1/2"
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={photo.image}
                      alt={`Imagen ${index + 1}`}
                      className="object-cover rounded-lg transition-opacity duration-300 h-max"
                      style={{
                        aspectRatio: '1/1',
                        opacity: index === currentPage ? 1 : 0.7,
                      }}
                      draggable={false}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <button
              onClick={handleNext}
              className=" bg-[#D05858] p-1 md:p-2 rounded-full shadow-lg hover:bg-white"
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
