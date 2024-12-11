import {useState} from "react";
import FormSection from "./home/searchSection/FormSection";
import ResultSection from "./home/searchSection/ResultSection";
import {useDispatch} from "react-redux";
import {AvailabilityDTO} from "@/types/availability";
import {fetchAvailableStudios} from "@/reducers/availableStudios";
import {bookingSlice} from "@/reducers/bookingReducer.ts";

export const {setQuote, clearQuote} = bookingSlice.actions;

export default function SearchSection() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState<AvailabilityDTO>();

  const handleSearch = async (values: any) => {
    const {specialtyName, ...availabilityDTO} = values;
    setSearchParams(availabilityDTO);

    try {
      const resultAction = await dispatch(
        fetchAvailableStudios(availabilityDTO)
      );

      const {specialtyId, ...quoteParams} = availabilityDTO;

      if (fetchAvailableStudios.fulfilled.match(resultAction)) {
        const resultSection = document.getElementById("result-section");
        if (resultSection) {
          resultSection.scrollIntoView({behavior: "smooth", block: "center"});
          dispatch(setQuote({
            ...quoteParams,
          }));
        }

      }
    } catch (error) {
      console.error("Failed to fetch available studios", error);
    }
  };

  return (
    <>
      <FormSection onSearch={handleSearch}/>
      {searchParams && (
        <div id="result-section">
          <ResultSection searchParams={searchParams}/>
        </div>
      )}
    </>
  );
}
