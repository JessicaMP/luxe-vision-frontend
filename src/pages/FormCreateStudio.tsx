import GeneralInformation from '../components/pages/FormCreateStudio/Generalinformation';
import ContactInformation from '../components/pages/FormCreateStudio/ContactInformation';
import Location from '../components/pages/FormCreateStudio/Location';
import Specialty from '../components/pages/FormCreateStudio/Specialty';
import PhotographerTeam from '../components/pages/FormCreateStudio/PhotographerTeam';
import SectionImage from '../components/pages/FormCreateStudio/SectionImages';
import Button from '@mui/joy/Button';
import { useState } from "react";

const FormCreateStudio = () => {
  const [generalInfo, setGeneralInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [location, setlLocation] = useState({});
  const [specialties, setSpecialties] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [sectionImages, setSectionImages] = useState({});

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
  }

  const handleTeamChange = (data: any) => {
    setPhotographers(data);
  }

  const handleImagesChange = (data: any) => {
    setSectionImages(data);
  }
  console.log({generalInfo, contactInfo, location, specialties, photographers, sectionImages});



  const handleSubmit = async (e) => {
    e.preventDefault();

    const studioData = {
      ...generalInfo,
      signup: new Date().toISOString(),
      ...contactInfo,
      location,
      photographers,
      portfolioPhotos: [],
      studioSpecialties: [...specialties].map((id) => ({ specialty: { id } })),
    };
    console.log({studioData});


    const {profileImageFile, portfolioFiles} = sectionImages

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
      const response = await fetch("http://54.234.87.12:8080/studios", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const savedStudio = await response.json();
        console.log("Studio saved successfully:", savedStudio);
      } else {
        console.error("Error saving studio:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="bg-[#454243]">
      <section className="container mx-auto py-10">
        <div className="max-w-screen-2xl space-y-10">
        <h1 className="text-[#D05858] font-bold text-5xl">Add photo studio</h1>

        <form onSubmit={handleSubmit} className="bg-[#DADADA] py-8 px-12 rounded-2xl space-y-5">
          <GeneralInformation onChangeInfo={handleGeneralInfoChange} />
          <ContactInformation onChangeInfo={handleContactInformationChange} />
          <Location onChangeInfo={handleLocationChange} />
          <Specialty onChangeInfo={handleSpecialtyChange}/>
          <PhotographerTeam onChangeInfo={handleTeamChange} />
          <SectionImage onChangeInfo={handleImagesChange} />
          <div className="flex justify-end">
            <Button type="submit" size="lg" color="danger">Submit</Button>
          </div>
        </form>
        </div>
      </section>
    </main>
  );
};

export default FormCreateStudio;
