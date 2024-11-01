import GeneralInformation from '../components/pages/FormCreateStudio/Generalinformation';
import ContactInformation from '../components/pages/FormCreateStudio/ContactInformation';
import Location from '../components/pages/FormCreateStudio/Location';
import Specialty from '../components/pages/FormCreateStudio/Specialty';
import PhotographerTeam from '../components/pages/FormCreateStudio/PhotographerTeam';
import SectionImage from '../components/pages/FormCreateStudio/SectionImages';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import ApiService from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addStudio } from '@/reducers/studioSlice';

const FormCreateStudio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state: RootState) => state.studios);
  const loading = status === 'loading';

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
  };

  const handleTeamChange = (data: any) => {
    setPhotographers(data);
  };

  const handleImagesChange = (data: any) => {
    setSectionImages(data);
  };

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

    const { profileImageFile, portfolioFiles } = sectionImages;

    const formData = new FormData();
    formData.append(
      'studio',
      new Blob([JSON.stringify(studioData)], { type: 'application/json' })
    );
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }
    portfolioFiles.forEach((file: any) => {
      formData.append('portfolioImages', file);
    });

    try {
      const resultAction = await dispatch(addStudio(formData));
      if (addStudio.fulfilled.match(resultAction)) {
        const { id } = resultAction.payload;
        navigate(`/studio/${id}`);
      }
    } catch (err) {
      console.error('Error:', err);
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
            <PhotographerTeam onChangeInfo={handleTeamChange} />
            <SectionImage onChangeInfo={handleImagesChange} />
            <div className="flex justify-end">
              <Button type="submit" size="lg" color="danger" loading={loading}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default FormCreateStudio;
