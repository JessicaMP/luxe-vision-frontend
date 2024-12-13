import CustomButton from "@/components/Buttons/CustomButton";
import CardRecommend from "@/components/pages/home/recommendations/CardRecommend";
import { RootState } from "@/store";
import { Studio } from "@/types/studio";
import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ListSpecialtyStudios = () => {
  const { id } = useParams();
  const idSpecialty = Number(id);
  const allStudios = useSelector(
    (state: RootState) => state.studios.studios
  ) as Studio[];

  const filteredStudios = allStudios.filter((studio) =>
    studio.studioSpecialties.some(
      (specialty) => specialty.specialty.id === idSpecialty
    )
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#454243]">
      <section className="container py-32 px-4 sm:px-10 min-h-[85vh] max-w-6xl mx-auto md:mt-10">
        <div className="space-y-10">
          <header className="flex justify-between items-center gap-4">
            <h1 className="text-white font-bold text-4xl">
              Studios with specialty <br />
              <span className="text-[#D05858]">
                {
                  filteredStudios[0].studioSpecialties[0].specialty
                    .specialtyName
                }
              </span>
            </h1>

            <CustomButton onClick={() => window.history.back()}>
              <FaChevronLeft className="text-white" />
              Back
            </CustomButton>
          </header>
          <div className="container md:py-4 min-h-[85vh] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
              {filteredStudios.map((studio) => (
                <CardRecommend key={studio.id} studio={studio} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ListSpecialtyStudios;
