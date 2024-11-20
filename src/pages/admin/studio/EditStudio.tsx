import GeneralInformation from "@/components/pages/FormCreateStudio/Generalinformation";
import ContactInformation from "@/components/pages/FormCreateStudio/ContactInformation";
import Location from "@/components/pages/FormCreateStudio/Location";
import Specialty from "@/components/pages/FormCreateStudio/Specialty";
import Features from "@/components/pages/FormCreateStudio/Features";
import PhotographerTeam from "@/components/pages/FormCreateStudio/PhotographerTeam";
import SectionImage from "@/components/pages/FormCreateStudio/SectionImages";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStudioById, updateStudio } from "@/reducers/studiosReducer";
import { Toaster } from "@/components/ui/toaster";
import { Photographer, Studio, StudioFeature, StudioSpecialty } from "@/types";
import { AppDispatch, RootState } from "@/store";
import NotFoundStudio from "@/components/pages/detail/NotFoundStudio";

const EditStudio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  dispatch(setActiveStudioById(Number(id)));

  const studio: Studio = useSelector(
    (state: RootState) => state.studios.studio
  ) as Studio;

  if (!studio) return <NotFoundStudio />;

  const [generalInfo, setGeneralInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [location, setlLocation] = useState({});
  const [specialties, setSpecialties] = useState<StudioSpecialty[]>([]);
  const [features, setFeatures] = useState<StudioFeature[]>([]);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [sectionImages, setSectionImages] = useState({});
  const [signup, setSignup] = useState<Date>();

  useEffect(() => {
    if (studio) {
      setGeneralInfo({
        studioName: studio.studioName,
        description: studio.description,
        yearsOfExperience: studio.yearsOfExperience,
      });
      setContactInfo({
        email: studio.email,
        phone: studio.phone,
      });
      setlLocation(studio.location);
      setSpecialties(studio.studioSpecialties);
      setFeatures(studio.studioFeatures);
      setPhotographers(studio.photographers);
      setSectionImages({
        profileImageFile: studio.profileImage,
        portfolioFiles: studio.portfolioPhotos,
      });
      setSignup(studio.signup);
    }
  }, [studio]);

  const [errors, setErrors] = useState<string[]>([]);

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
    setErrors([]);
    const { profileImageFile, portfolioFiles }: any = sectionImages || {};
    console.log({ profileImageFile, portfolioFiles });
    const newErrors: string[] = [];

    if (!profileImageFile) {
      newErrors.push("Profile Image is required");
    }

    if (!portfolioFiles || portfolioFiles.length === 0) {
      newErrors.push("Portfolio Images are required");
    }

    if (
      portfolioFiles &&
      portfolioFiles.length > 0 &&
      portfolioFiles.length < 5
    ) {
      newErrors.push("Select at least 5 images in images portfolio");
    }

    if (newErrors.length > 0) {
      setErrors((prevErrors) => [...prevErrors, ...newErrors]);
    }
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = await validateImages();
    console.log({ newErrors });
    if (newErrors.length > 0) return;

    const studioData = {
      id: Number(id),
      ...generalInfo,
      signup: signup,
      ...contactInfo,
      location,
      photographers,
      specialties: [...specialties].map((id) => id),
      features,
    };
    console.log({ studioData });

    const { profileImageFile, portfolioFiles }: any = sectionImages;

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

    try {
      const resultAction = await dispatch(updateStudio(formData));
      if (updateStudio.fulfilled.match(resultAction)) {
        const { id } = resultAction.payload;
        navigate(`/studio/${id}`);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const setPropertys = async () => {
    const {
      studioName,
      description,
      yearsOfExperience,
      email,
      phone,
      location,
      studioSpecialties,
      studioFeatures,
    } = studio;

    // General information
    const general = { studioName, description, yearsOfExperience };
    handleGeneralInfoChange(general);

    // Contact information
    const contact = { email, phone };
    handleContactInformationChange(contact);

    // Location
    const locationData = {
      city: location.city,
      state: location.state,
      country: location.country,
      address: location.address,
    };
    handleLocationChange(locationData);

    // Specialties
    const specialtys = studioSpecialties.map(
      (specialty: any) => specialty.specialty.id
    );
    handleSpecialtyChange(specialtys);

    // Features
    const features = studioFeatures.map((feature: any) => feature.feature.id);
    handleFeaturesChange(features);

    // Photographers
    const photographersData = studio.photographers.map((photographer: any) => ({
      firstName: photographer.firstName,
      lastName: photographer.lastName,
    }));
    handleTeamChange(photographersData);
  };

  useEffect(() => {
    setPropertys();
  }, []);

  return (
    <main className="bg-[#454243]">
      <section className="container mx-auto py-10 px-4 sm:px-10">
        <div className="space-y-10">
          <h1 className="text-[#D05858] font-bold text-5xl">
            Edit photo studio
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-[#DADADA] py-8 px-12 rounded-2xl space-y-5"
          >
            <GeneralInformation
              onChangeInfo={handleGeneralInfoChange}
              isEdit={true}
            />
            <ContactInformation
              onChangeInfo={handleContactInformationChange}
              isEdit={true}
            />
            <Location onChangeInfo={handleLocationChange} isEdit={true} />
            <Specialty onChangeInfo={handleSpecialtyChange} isEdit={true} />
            <Features onChangeInfo={handleFeaturesChange} isEdit={true} />
            <PhotographerTeam onChangeInfo={handleTeamChange} isEdit={true} />
            <SectionImage onChangeInfo={handleImagesChange} isEdit={true} />
            <div className="flex justify-end">
              <Button type="submit" size="lg" color="danger">
                Submit
              </Button>
            </div>
            {errors.length > 0 &&
              errors.map((error, index) => (
                <p key={index} className="font-bold text-red-700 text-sm">
                  {" "}
                  * {error}
                </p>
              ))}
          </form>
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default EditStudio;
