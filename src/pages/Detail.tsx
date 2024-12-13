import { useEffect, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import { FaAward, FaChevronLeft, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import ModalDetail from "../components/pages/detail/ModalDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Studio, StudioAvailability, StudioFeature } from "@/types/studio";
import NotFoundStudio from "@/components/pages/detail/NotFoundStudio";
import { Icon } from "@iconify/react";
import { RootState } from "@/store";
import { selectStudioWithFavorite } from "@/reducers/studioSelector";
import {
  bookingSlice,
  fetchBookingByStudioId,
} from "@/reducers/bookingReducer";
import Availability from "./Availability";
import ButtonFavorite from "@/components/pages/favorites/ButtonFavorite";
import { IoMdShare } from "react-icons/io";
import { OccupiedSlot } from "@/types/availability";
import { QuoteDTO } from "@/types/quote";
import { DetailSkeleton } from "@/components/pages/detail/DetailSkeleton";
import {
  fetchStudioPricesAPI,
  selectStudioById,
} from "@/reducers/studiosReducer";
import { fetchWorkingHoursByStudioId } from "@/reducers/availableStudios";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [open, setOpen] = useState(false);
  const [studio, setStudio] = useState<Studio | null>(null);
  const [occupiedHours, setOccupiedHours] = useState<OccupiedSlot[]>([]);
  const [availableHours, setAvailableHours] = useState<StudioAvailability>();

  const { id } = useParams();
  const studioId = Number(id);
  dispatch(selectStudioById(studioId));

  const currentStudio = useSelector(selectStudioWithFavorite) as Studio;
  const statusCurrentStudio = useSelector(
    (state: RootState) => state.studios.status
  );

  const currentBookings = useSelector(
    (state: RootState) => state.bookings.bookingsStudio
  ) as OccupiedSlot[];

  const currentWorkingHours = useSelector(
    (state: RootState) => state.availability.workingHours
  ) as StudioAvailability;

  const statusBookings = useSelector(
    (state: RootState) => state.bookings.status
  );

  const statusAvailability = useSelector(
    (state: RootState) => state.availability.status
  );

  const onReserve = (quote: QuoteDTO) => {
    dispatch(bookingSlice.actions.setQuote(quote));
    navigate("/confirm-quote");
  };

  useEffect(() => {
    setStudio(currentStudio);
    setOccupiedHours(currentBookings);
    setAvailableHours(currentWorkingHours);

    if (currentStudio && (!availableHours || !occupiedHours)) {
      dispatch(fetchWorkingHoursByStudioId(studioId));
      dispatch(fetchStudioPricesAPI(studioId));
      dispatch(fetchBookingByStudioId(studioId));
    }
  }, [currentStudio, studioId, currentBookings, currentWorkingHours]);

  const { isAuthenticated } = useSelector((state: RootState) => state.users);

  if (
    statusBookings === "loading" ||
    statusAvailability === "loading" ||
    statusCurrentStudio === "loading" ||
    !studio
  ) {
    return <DetailSkeleton />;
  }

  if (statusCurrentStudio === "failed") {
    return <NotFoundStudio />;
  }

  const portfolioPhotosLength =
    studio.portfolioPhotos.length > 5 ? 5 : studio.portfolioPhotos.length;

  return (
    <main className="bg-white">
      <div className="container mx-auto py-20 space-y-8 px-4 sm:px-10 mt-4 ">
        <header className="flex flex-row justify-between items-start md:items-end gap-4 md:gap-0 order-2 sm:order-first md:order-1">
          <div className="flex flex-col sm:flex-row gap-3 md:mt-12">
            <Avatar
              alt="Remy Sharp"
              src={`${studio.profileImage}?t=${studio.lastUpdate}`}
              sx={{
                "--Avatar-size": { xs: "90px", md: "170px" },
              }}
              className="hidden md:block"
            />
            <div className="flex flex-col justify-center text-black space-y-2.5 font-semibold">
              <h1 className="text-4xl md:text-6xl">{studio.studioName}</h1>
              {studio.studioSpecialties.length > 0 &&
                studio.studioSpecialties.map(({ specialty }) => (
                  <h2
                    key={specialty.specialtyName}
                    className="text-[#D05858] text-2xl "
                  >
                    {specialty.specialtyName}
                  </h2>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 items-end">
            <Button
              color="danger"
              size="lg"
              variant="outlined"
              startDecorator={<FaChevronLeft />}
              className="order-1 sm:order-last md:order-2 max-w-28"
              onClick={() => {
                window.history.back();
                dispatch(bookingSlice.actions.clearQuote());
              }}
            >
              <span className="text-black">Back</span>
            </Button>
            {isAuthenticated && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
                <div className="invisible">reviews</div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <Button variant="plain">
                    <IoMdShare className="text-[#FFA987] text-2xl" />
                    <p className="pl-2 text-[#444243] text-xl">Share</p>
                  </Button>
                  <ButtonFavorite
                    id={studio.id}
                    status={studio.isFavorite ?? false}
                    classBtn="text-[#FFA987] text-2xl"
                  >
                    <p className="text-xl">
                      {studio.isFavorite ? "Unsave" : "Save"}
                    </p>
                  </ButtonFavorite>
                </div>
              </div>
            )}
          </div>
        </header>

        <section className="flex gap-4 relative w-full h-[500px]">
          {studio.portfolioPhotos.length > 0 && (
            <div className="w-full flex gap-4">
              {studio.portfolioPhotos.length > 0 && (
                <div className="md:w-1/2">
                  <img
                    src={`${studio.portfolioPhotos[0].image}?t=${studio.lastUpdate}`}
                    alt={`Imagen 1`}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ aspectRatio: "4/3" }}
                  />
                </div>
              )}

              <div className="w-1/2 hidden md:grid grid-cols-2 grid-rows-2 gap-4">
                {studio.portfolioPhotos
                  .slice(1, portfolioPhotosLength)
                  .map((photo, i) => (
                    <img
                      key={i}
                      src={`${photo.image}?t=${studio.lastUpdate}`}
                      alt={`Imagen ${i + 2}`}
                      className="w-full h-full object-cover rounded-lg"
                      style={{ aspectRatio: "1/1" }}
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
        <div className="w-[95%] md:w-[90%] lg:w-[70%] xl:w-[65%] 2xl:w-[55%] mx-auto flex flex-col gap-12">
          <section className="space-y-14 w-full flex justify-center">
            <div className=" w-full flex flex-col gap-12">
              <p className="text-lg md:text-2xl font-medium text-[#444243] italic leading-9">
                {studio.description}
              </p>
              <div className="space-y-6 text-[#444243] grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-4">
                <div className="flex items-center gap-4 ">
                  <MdEmail className="text-3xl sm:text-4xl text-[#D05858]" />
                  <div className="space-y-2">
                    <h3 className="font-bold leading-9 text-xl sm:text-2xl">
                      Email
                    </h3>
                    <span>{studio.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 ">
                  <FaPhoneAlt className="text-3xl sm:text-4xl text-[#D05858]" />
                  <div className="space-y-2">
                    <h3 className="font-bold leading-9 text-xl sm:text-2xl">
                      Phone
                    </h3>
                    <span>{studio.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 ">
                  <FaLocationDot className="text-3xl sm:text-4xl text-[#D05858]" />
                  <div className="space-y-2">
                    <h3 className="font-bold leading-9 text-xl sm:text-2xl">
                      Address
                    </h3>
                    <span>
                      {studio.location.city +
                        ", " +
                        studio.location.state +
                        ", " +
                        studio.location.country}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 ">
                  <FaAward className="text-3xl sm:text-4xl text-[#D05858]" />
                  <div className="space-y-2">
                    <h3 className="font-bold leading-9 text-xl sm:text-2xl">
                      Experience
                    </h3>
                    <span>
                      {studio.yearsOfExperience}{" "}
                      {studio.yearsOfExperience === 1 ? "year" : "years"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#D05858] py-5 space-y-6 ">
                <h3 className="text-[#D05858] font-semibold text-3xl ">
                  Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-4 md:max-w-xl">
                  {studio.studioFeatures?.length > 0 &&
                    studio.studioFeatures.map(({ feature }: StudioFeature) => (
                      <div key={feature.id} className="flex gap-2 items-center">
                        {feature.icon && <Icon icon={feature.icon} />}
                        <span className="text-lg">{feature.featureName}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-14 w-full flex justify-center">
            <div className="w-full flex flex-col gap-12">
              <h3 className="text-[#D05858] font-semibold text-3xl justify-start">
                Availability
              </h3>
              {availableHours && (
                <Availability
                  occupiedSlots={occupiedHours}
                  studioAvailability={availableHours}
                  onReserve={onReserve}
                />
              )}
            </div>
          </section>
        </div>

        <ModalDetail open={open} setOpen={setOpen} studio={studio} />
      </div>
    </main>
  );
};

export default Detail;
