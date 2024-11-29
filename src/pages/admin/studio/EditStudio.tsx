import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudiosAPI,
  updateStudio,
  updateStudioAPI,
} from "@/reducers/studiosReducer";
import store, { AppDispatch, RootState } from "@/store";
import NotFoundStudio from "@/components/pages/detail/NotFoundStudio";
import StudioForm from "./StudioForm";
import { selectStudioById } from "@/selectors/studioSelector";
import { StudioFeature, StudioSpecialty } from "@/types";
import { useParams } from "react-router-dom";

const EditStudio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const studio = useSelector((state) =>
    selectStudioById(Number(id), state as RootState)
  );

  if (!studio) return <NotFoundStudio />;

  const initialData = {
    id: studio.id,
    generalInfo: {
      studioName: studio.studioName,
      description: studio.description,
      yearsOfExperience: studio.yearsOfExperience,
    },
    contactInfo: {
      email: studio.email,
      phone: studio.phone,
    },
    location: studio.location,
    specialties: studio.studioSpecialties.map(
      (specialty: StudioSpecialty) => specialty.specialty.id
    ),
    features: studio.studioFeatures.map(
      (feature: StudioFeature) => feature.feature.id
    ),
    photographers: studio.photographers,
    sectionImages: {
      profileImage: studio.profileImage,
      portfolioPhotos: studio.portfolioPhotos,
      profileImageFile: null,
      portfolioFiles: [],
    },
    lastUpdate: studio.lastUpdate,
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const resultAction = await dispatch(updateStudioAPI(formData));

      // store.dispatch(fetchStudiosAPI());
      return resultAction.payload;
    } catch (err) {
      console.error("Error: ", err);
      return null;
    }
  };

  return (
    <StudioForm
      initialData={initialData}
      isEdit={true}
      onSubmit={handleSubmit}
    />
  );
};

export default EditStudio;
