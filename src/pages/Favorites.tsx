import {FaChevronLeft} from "react-icons/fa";
import {useEffect} from "react";
import CardRecommend from "@/components/pages/home/recommendations/CardRecommend";
import {useDispatch, useSelector} from "react-redux";
import {selectFavorites} from "@/reducers/studioSelector";
import {fetchFavorites} from "@/reducers/favoritesReducer";
import CustomButton from "@/components/buttons/CustomButton.tsx";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites) || [];

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);
  return (
    <main className="bg-[#454243]">
      <section className="container mx-auto py-32 px-4 sm:px-10 min-h-[85vh] max-w-4xl mx-auto">
        <div className="space-y-10">
          <header className="flex justify-between items-center gap-4">
            <h1 className="text-[#FFA987] font-bold text-4xl">Favorites</h1>

            <CustomButton onClick={() => window.history.back()}>
              <FaChevronLeft className="text-white"/>
              Back
            </CustomButton>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
            {favorites.map(
              (favorite: any) =>
                favorite != undefined && (
                  <CardRecommend key={favorite.id} studio={favorite}/>
                )
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Favorites;
