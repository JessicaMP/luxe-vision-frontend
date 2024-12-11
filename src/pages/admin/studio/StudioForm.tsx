import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import GeneralInformation from "@/components/pages/FormCreateStudio/Generalinformation";
import ContactInformation from "@/components/pages/FormCreateStudio/ContactInformation";
import Location from "@/components/pages/FormCreateStudio/Location";
import Specialty from "@/components/pages/FormCreateStudio/Specialty";
import Features from "@/components/pages/FormCreateStudio/Features";
import PhotographerTeam from "@/components/pages/FormCreateStudio/PhotographerTeam";
import SectionImage from "@/components/pages/FormCreateStudio/SectionImages";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { StudioFeature, StudioSpecialty } from "@/types/types";

interface StudioFormProps {
  initialData?: any;
  isEdit?: boolean;
  onSubmit: (formData: FormData) => Promise<any>;
  loading?: boolean;
}

const StudioForm = ({
  initialData,
  isEdit = false,
  onSubmit,
  loading = false,
}: StudioFormProps) => {
  const defaultState = {
    generalInfo: {},
    contactInfo: {},
    location: {},
    specialties: [],
    features: [],
    photographers: [],
    sectionImages: {},
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    generalInfo: initialData?.generalInfo || defaultState.generalInfo,
    contactInfo: initialData?.contactInfo || defaultState.contactInfo,
    location: initialData?.location || defaultState.location,
    specialties: initialData?.specialties || defaultState.specialties,
    features: initialData?.features || defaultState.features,
    photographers: initialData?.photographers || defaultState.photographers,
    sectionImages: initialData?.sectionImages || defaultState.sectionImages,
  });

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const [errors, setErrors] = useState<string[]>([]);

  const handleGeneralInfoChange = (data: any) => {
    setFormData((prev) => ({ ...prev, generalInfo: data }));
  };

  const handleContactInformationChange = (data: any) => {
    setFormData((prev) => ({ ...prev, contactInfo: data }));
  };

  const handleLocationChange = (data: any) => {
    setFormData((prev) => ({ ...prev, location: data }));
  };

  const handleSpecialtyChange = (data: any) => {
    setFormData((prev) => ({ ...prev, specialties: data }));
  };

  const handleFeaturesChange = (data: any) => {
    setFormData((prev) => ({ ...prev, features: data }));
  };

  const handleTeamChange = (data: any) => {
    setFormData((prev) => ({ ...prev, photographers: data }));
  };

  const handleImagesChange = (data: any) => {
    setFormData((prev) => ({ ...prev, sectionImages: data }));
  };

  const validateImages = () => {
    setErrors([]);
    const {
      profileImage,
      portfolioPhotos,
      profileImageFile,
      portfolioFiles,
    }: any = formData.sectionImages || {};
    const newErrors: string[] = [];

    if (!isEdit) {
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
    } else {
      if (!profileImageFile && !profileImage) {
        newErrors.push("Profile Image is required");
      }

      if (!portfolioFiles && !portfolioPhotos) {
        newErrors.push("Portfolio Images are required");
      }

      const totalImages =
        (portfolioFiles?.length || 0) + (portfolioPhotos?.length || 0);
      if (totalImages < 5) {
        newErrors.push("Select at least 5 images in images portfolio");
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = validateImages();
    if (newErrors.length > 0) return;

    const studioData = {
      id: initialData?.id,
      ...formData.generalInfo,
      ...formData.contactInfo,
      location: formData.location,
      photographers: formData.photographers,
      specialties: [...formData.specialties],
      features: [...formData.features],
    };

    if (isEdit) {
      studioData.id = initialData?.id;
    }

    const { profileImageFile, portfolioFiles, portfolioPhotos }: any =
      formData.sectionImages;

    const formDataToSend = new FormData();
    formDataToSend.append(
      "studio",
      new Blob([JSON.stringify(studioData)], { type: "application/json" })
    );

    if (
      isEdit &&
      portfolioPhotos?.length !== 5 &&
      portfolioFiles?.length !== 0
    ) {
      const studioImagesUrl = {
        portfolioPhotos: portfolioPhotos.map((photo: any) => photo.image),
      };
      formDataToSend.append(
        "studioImagesURL",
        new Blob([JSON.stringify(studioImagesUrl)], {
          type: "application/json",
        })
      );
    }

    if (profileImageFile) {
      formDataToSend.append("profileImage", profileImageFile);
    }

    if (portfolioFiles) {
      portfolioFiles.forEach((file: any) => {
        formDataToSend.append("portfolioImages", file);
      });
    }

    try {
      const result = await onSubmit(formDataToSend);
      if (result?.id) {
        // window.location.href = `/studio/${result.id}`;
        navigate(`/studio/${result.id}`);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <main className="bg-[#454243]">
      <section className="container mx-auto py-10 px-4 sm:px-10">
        <div className="space-y-10">
          <h1 className="text-[#D05858] font-bold text-5xl">
            {isEdit ? "Edit" : "Add"} photo studio
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-[#DADADA] py-8 px-12 rounded-2xl space-y-5"
          >
            <GeneralInformation
              onChangeInfo={handleGeneralInfoChange}
              isEdit={isEdit}
              initialData={formData.generalInfo}
            />
            <ContactInformation
              onChangeInfo={handleContactInformationChange}
              isEdit={isEdit}
              initialData={formData.contactInfo}
            />
            <Location
              onChangeInfo={handleLocationChange}
              isEdit={isEdit}
              initialData={formData.location}
            />
            <Specialty
              onChangeInfo={handleSpecialtyChange}
              isEdit={isEdit}
              initialData={formData.specialties}
            />
            <Features
              onChangeInfo={handleFeaturesChange}
              isEdit={isEdit}
              initialData={formData.features}
            />
            <PhotographerTeam
              onChangeInfo={handleTeamChange}
              isEdit={isEdit}
              initialData={formData.photographers}
            />
            <SectionImage
              onChangeInfo={handleImagesChange}
              isEdit={isEdit}
              initialData={formData.sectionImages}
            />
            <div className="flex justify-end">
              <Button type="submit" size="lg" color="danger" loading={loading}>
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

export default StudioForm;
