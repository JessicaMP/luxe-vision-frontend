import { FaChevronLeft } from "react-icons/fa";
import { Button as BaseButton, ButtonProps } from "@mui/base/Button";
import { forwardRef, useEffect } from "react";
import clsx from "clsx";
import CardRecommend from "@/components/pages/home/recommendations/CardRecommend";
import { useSelector, useDispatch } from "react-redux";
import { selectFavorites } from "@/reducers/studioSelector";
import { fetchFavorites } from "@/reducers/favoritesReducer";

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <BaseButton
        ref={ref}
        className={clsx(
          "cursor-pointer transition text-xl font-sans font-semibold leading-normal bg-transparent text-[#FFA987] hover:border-[#FFA987] rounded-lg px-4 py-2 border border-solid border-white   hover:bg-[#FFA987] hover:text-white flex items-center gap-2",
          className
        )}
        {...other}
      />
    );
  }
);

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites) || [];

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);
  return (
    <main className="bg-[#454243]">
      <section className="container mx-auto py-32 px-4 sm:px-10 min-h-[85vh]">
        <div className="space-y-10">
          <header className="flex justify-between items-center gap-4">
            <h1 className="text-[#FFA987] font-bold text-4xl">Favorites</h1>

            <CustomButton onClick={() => window.history.back()}>
              <FaChevronLeft className="text-white" />
              Back
            </CustomButton>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
            {favorites.map(
              (favorite: any) =>
                favorite != undefined && (
                  <CardRecommend key={favorite.id} studio={favorite} />
                )
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Favorites;
