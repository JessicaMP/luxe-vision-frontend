import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { fetchStudioPricesAPI, setStudio } from "@/reducers/studiosReducer";
import { useDispatch } from "react-redux";
import { Studio } from "@/types/studio";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import ButtonFavorite from "@/components/pages/favorites/ButtonFavorite";
import { useSelector } from "react-redux";
import { RootState } from "src/store.ts";
import { fetchBookingByStudioId } from "@/reducers/bookingReducer";
import { fetchWorkingHoursByStudioId } from "@/reducers/availableStudios";

export default function CardRecommend({ studio }: { studio: Studio }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(setStudio(studio));
    dispatch(fetchBookingByStudioId(studio.id));
    dispatch(fetchWorkingHoursByStudioId(studio.id));
    dispatch(fetchStudioPricesAPI(studio.id));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    studio && (
      <Card className="relative studio-card min-w-[250px] min-h-[250px] h-[300px] text-white border-0 grid grid-cols-2 overflow-hidden">
        {isAuthenticated && (
          <ButtonFavorite
            className="absolute top-4 right-4"
            id={studio.id}
            status={studio.isFavorite ?? false}
          />
        )}
        <CardContent className="p-0">
          <img
            alt="title"
            className="rounded-lg h-full drop-shadow-[20px_0_20px_rgba(0,0,0,0.15)]"
            src={studio.portfolioPhotos[0].image}
            draggable={false}
            style={{
              objectFit: "cover",
            }}
          />
        </CardContent>
        <CardFooter className="p-4 bg-white flex flex-col gap-4 ">
          <Avatar
            alt="logo"
            src={studio.profileImage}
            sx={{ width: 70, height: 70 }}
          />
          <h3 className="studio-name text-sm text-black truncate">
            {studio.studioName}
          </h3>

          <p className="text-lg text-black font-bold text-center break-words overflow-hidden line-clamp-2">
            {studio.studioSpecialties[0].specialty.specialtyName}
          </p>
          <p className="text-sm text-gray-500 text-center break-words overflow-hidden line-clamp-2">
            {studio.location.city + ", " + studio.location.state}
          </p>
          <Link
            onClick={handleCardClick}
            to={`/studio/${studio.id}`}
            className="text-sm text-red-500"
          >
            Show details
          </Link>
        </CardFooter>
      </Card>
    )
  );
}
