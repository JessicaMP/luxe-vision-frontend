import { useEffect, useState } from 'react';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import { FaChevronLeft, FaPhoneAlt, FaAward } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import ModalDetail from '../components/pages/detail/ModalDetail';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudioById } from '@/reducers/studioSelector';
import { Studio } from '@/types';
import NotFoundStudio from '@/components/pages/detail/NotFoundStudio';

const Detail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const studio: Studio = useSelector((state) =>
    selectStudioById(state, Number(id))
  );

  if (!studio) {
    return <NotFoundStudio />;
  }

  const portfolioPhotosLength =
    studio.portfolioPhotos.length > 5 ? 5 : studio.portfolioPhotos.length;

  return (
    <main className="bg-white">
      <div className="container mx-auto py-20 space-y-6 px-4 sm:px-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <Avatar
              alt="Remy Sharp"
              src={studio.profileImage}
              sx={{
                '--Avatar-size': { xs: '90px', md: '170px' },
              }}
              className="hidden md:block"
            />
            <div className="flex flex-col justify-center text-black space-y-2.5 font-semibold">
              <h1 className="text-4xl md:text-6xl">{studio.studioName}</h1>
              <h2 className="text-[#D05858] text-4xl ">
                {studio.studioSpecialties[0].specialty.specialtyName}
              </h2>
            </div>
          </div>
          <Button
            color="danger"
            size="lg"
            variant="outlined"
            startDecorator={<FaChevronLeft />}
            className="order-first md:order-last"
            onClick={() => window.history.back()}
          >
            <span className="text-black">Back</span>
          </Button>
        </header>

        <section className="flex gap-4 relative w-full h-[500px]">
          {studio.portfolioPhotos.length > 0 && (
            <div className="w-full flex gap-4">
              <div className="md:w-1/2">
                <img
                  src={studio.portfolioPhotos[0].image}
                  loading="lazy"
                  alt={`Imagen 1`}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>

              <div className="w-1/2 hidden md:grid grid-cols-2 grid-rows-2 gap-4">
                {studio.portfolioPhotos
                  .slice(1, portfolioPhotosLength)
                  .map((photo, i) => (
                    <img
                      key={i}
                      src={photo.image}
                      loading="lazy"
                      alt={`Imagen ${i + 2}`}
                      className="w-full h-full object-cover rounded-lg"
                      style={{ aspectRatio: '1/1' }}
                    />
                  ))}
              </div>
            </div>
          )}
          <div className="absolute bottom-8 right-5">
            <Button
              color="danger"
              size="lg"
              variant="solid"
              startDecorator={<BsFillGrid1X2Fill />}
              onClick={() => setOpen(true)}
            >
              Show more
            </Button>
          </div>
        </section>

        <section className="space-y-14">
          <p className="text-lg md:text-2xl font-medium text-[#444243] italic leading-9">
            {studio.description}
          </p>

          <div className="space-y-6 text-[#444243]">
            <div className="flex items-center gap-8">
              <MdEmail className="text-3xl sm:text-4xl text-[#D05858]" />
              <div className="space-y-2">
                <h3 className="font-bold leading-9 text-xl sm:text-2xl">
                  Email
                </h3>
                <span>{studio.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <FaPhoneAlt className="text-3xl sm:text-4xl text-[#D05858]" />
              <div className="space-y-2">
                <h3 className="font-bold leading-9 text-xl sm:text-2xl">
                  Phone
                </h3>
                <span>{studio.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <FaLocationDot className="text-3xl sm:text-4xl text-[#D05858]" />
              <div className="space-y-2">
                <h3 className="font-bold leading-9 text-xl sm:text-2xl">
                  Address
                </h3>
                <span>
                  {studio.location.city +
                    ', ' +
                    studio.location.state +
                    ', ' +
                    studio.location.country}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <FaAward className="text-3xl sm:text-4xl text-[#D05858]" />
              <div className="space-y-2">
                <h3 className="font-bold leading-9 text-xl sm:text-2xl">
                  Experience
                </h3>
                <span>
                  {studio.yearsOfExperience}{' '}
                  {studio.yearsOfExperience === 1 ? 'year' : 'years'}
                </span>
              </div>
            </div>
          </div>
        </section>
        <ModalDetail open={open} setOpen={setOpen} studio={studio} />
      </div>
    </main>
  );
};

export default Detail;
