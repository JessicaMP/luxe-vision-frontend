import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addStudio } from "@/reducers/studiosReducer";
import { toast } from "@/hooks/use-toast";
import StudioForm from "./StudioForm";

const AddStudio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.studios);
  const loading = status === "loading";

  const initialData = {
    generalInfo: {
      studioName: "",
      description: "",
      yearsOfExperience: 0,
    },
    contactInfo: {
      email: "",
      phone: "",
    },
    location: "",
    specialties: [],
    features: [],
    photographers: [],
    sectionImages: {
      profileImage: "",
      portfolioPhotos: [],
      profileImageFile: null,
      portfolioFiles: [],
    },
    lastUpdate: "",
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const resultAction = await dispatch(addStudio(formData));
      if (addStudio.rejected.match(resultAction)) {
        toast({
          title: "Duplicate study name",
          description: "Cannot add duplicate study name",
          variant: "destructive",
        });
        return null;
      }
      return resultAction.payload;
    } catch (err) {
      console.error("Error: ", err);
      return null;
    }
  };

  return (
    <StudioForm
      onSubmit={handleSubmit}
      loading={loading}
      initialData={initialData}
    />
  );
};

export default AddStudio;
