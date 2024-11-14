import GeneralInformation from "../../../components/pages/FormCreateStudio/Generalinformation";
import ContactInformation from "../../../components/pages/FormCreateStudio/ContactInformation";
import Location from "../../../components/pages/FormCreateStudio/Location";
import Specialty from "../../../components/pages/FormCreateStudio/Specialty";
import Features from "../../../components/pages/FormCreateStudio/Features";
import PhotographerTeam from "../../../components/pages/FormCreateStudio/PhotographerTeam";
import SectionImage from "../../../components/pages/FormCreateStudio/SectionImages";
import Button from "@mui/joy/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addStudio } from "@/reducers/studioSlice";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

const AddStudio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state: RootState) => state.studios);
  const loading = status === "loading";

  const [generalInfo, setGeneralInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [location, setlLocation] = useState({});
  const [specialties, setSpecialties] = useState([]);
  const [features, setFeatures] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [sectionImages, setSectionImages] = useState({});

  const [errors, setErrors] = useState([]);

  const handleGeneralInfoChange = (data: any) => {
    setGeneralInfo(data);
  };

  const handleContactInformationChange = (data: any) => {
    setContactInfo(data);
  };

  const handleLocationChange = (data: any) => {
    setlLocation(data);
  };

  const handleSpecialtyChange = (data: any) => {
    setSpecialties(data);
  };

  const handleFeaturesChange = (data: any) => {
    setFeatures(data);
  };

  const handleTeamChange = (data: any) => {
    setPhotographers(data);
  };

  const handleImagesChange = (data: any) => {
    setSectionImages(data);
  };

  const validateImages = () => {
    setErrors([])
    const { profileImageFile, portfolioFiles }: any = sectionImages || {};
    console.log({profileImageFile, portfolioFiles});
    const newErrors: string[] = [];

    if (!profileImageFile) {
      newErrors.push("Profile Image is required");
    }

    if (!portfolioFiles || portfolioFiles.length === 0) {
      newErrors.push("Portfolio Images are required");
    }

    if(portfolioFiles && portfolioFiles.length > 0 && portfolioFiles.length < 5) {
      newErrors.push("Select at least 5 images in images portfolio");
    }

    if (newErrors.length > 0) {
      setErrors((prevErrors) => [...prevErrors, ...newErrors]);
    }
    return newErrors
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors =  await validateImages();
    console.log({newErrors});
    if (newErrors.length > 0) return;

    const studioData = {
      ...generalInfo,
      signup: new Date().toISOString(),
      ...contactInfo,
      location,
      photographers,
      portfolioPhotos: [],
      specialties: [...specialties].map((id) => id),
      features,
    };

    const { profileImageFile, portfolioFiles }: any = sectionImages;
    console.log(studioData);

    const formData = new FormData();
    formData.append(
      "studio",
      new Blob([JSON.stringify(studioData)], { type: "application/json" })
    );
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }
    portfolioFiles.forEach((file: any) => {
      formData.append("portfolioImages", file);
    });
    console.log({formData});
    try {
      const resultAction = await dispatch(addStudio(formData));
      if (addStudio.fulfilled.match(resultAction)) {
        const { id } = resultAction.payload;
        navigate(`/studio/${id}`);
      } else if (addStudio.rejected.match(resultAction)) {
        toast({
          title: "Duplicate study name",
          description: "Cannot add duplicate study name",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <main className="bg-[#454243]">
      <section className="container mx-auto py-10 px-4 sm:px-10">
        <div className="space-y-10">
          <h1 className="text-[#D05858] font-bold text-5xl">
            Add photo studio
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-[#DADADA] py-8 px-12 rounded-2xl space-y-5"
          >
            <GeneralInformation onChangeInfo={handleGeneralInfoChange} />
            <ContactInformation onChangeInfo={handleContactInformationChange} />
            <Location onChangeInfo={handleLocationChange} />
            <Specialty onChangeInfo={handleSpecialtyChange} />
            <Features onChangeInfo={handleFeaturesChange} />
            <PhotographerTeam onChangeInfo={handleTeamChange} />
            <SectionImage onChangeInfo={handleImagesChange} />
            <div className="flex justify-end">
              <Button type="submit" size="lg" color="danger" loading={loading}>
                Submit
              </Button>
            </div>
            {errors.length > 0 &&
              errors.map((error, index) => <p key={index} className="font-bold text-red-700 text-sm"> * {error}</p>)}
          </form>
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default AddStudio;
