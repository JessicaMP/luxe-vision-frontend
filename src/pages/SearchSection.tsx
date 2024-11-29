"use client";

import { useEffect, useState } from "react";
import FormSection from "./home/searchSection/FormSection";
import ResultSection from "./home/searchSection/ResultSection";
import { Studio } from "@/types";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function SearchSection() {
  const [searchParams, setSearchParams] = useState<{
    specialty: string;
    date: Date;
    startTime: string;
    endTime: string;
  } | null>(null);

  const [studios, setStudios] = useState<Studio[]>([]);
  const [studiosCoincidences, setStudiosCoincidences] = useState<Studio[]>([]);

  const searchStudios = useSelector(
    (state: RootState) => state.studios.studios
  );

  useEffect(() => {
    setStudios(searchStudios);
  }, [searchStudios]);

  useEffect(() => {
    if (searchParams) {
      const coincidences = studios.filter((studio) =>
        studio.studioSpecialties.find(
          (specialty) =>
            specialty.specialty.specialtyName === searchParams.specialty
        )
      );
      setStudiosCoincidences(coincidences);
      const resultSection = document.getElementById("result-section");
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [searchParams]);

  const handleSearch = (values: any) => {
    setSearchParams(values);
  };

  return (
    <>
      <FormSection onSearch={handleSearch} />
      {searchParams && (
        <div id="result-section">
          <ResultSection
            searchParams={searchParams}
            studios={studiosCoincidences}
          />
        </div>
      )}
    </>
  );
}
