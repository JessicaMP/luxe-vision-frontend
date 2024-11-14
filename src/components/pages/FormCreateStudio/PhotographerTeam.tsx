import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import Input from '@mui/joy/Input';
import { selectStudio } from "@/reducers/studioSelector";
import { useSelector } from "react-redux";

export const PhotographerTeam = ({ onChangeInfo, isEdit= false }: any) => {
  const studio = useSelector(selectStudio) || {};
  const initialPhotographers = [{ firstName: '', lastName: '' }];
  const [numPhotographers, setNumPhotographers] = useState(1);
  const [photographers, setPhotographers] = useState(initialPhotographers);

  const handleNumPhotographersChange = (e: number) => {
    setNumPhotographers(e);

    const updatedPhotographers = Array.from({ length: e }, (_) => ({
      firstName: '',
      lastName: '',
    }));
    setPhotographers(updatedPhotographers);
  };

  const handlePhotographerChange = (index, field, value) => {
    const updatedPhotographers = [...photographers];
    updatedPhotographers[index] = {
      ...updatedPhotographers[index],
      [field]: value,
    };
    setPhotographers(updatedPhotographers);
    onChangeInfo(updatedPhotographers);
  };

  const setPropertys = () => {
    const {photographers} = studio;
    setNumPhotographers(photographers.length);
    const photographersData = photographers.map(({firstName,lastName}: any) => ({
      firstName,lastName
    }))
    setPhotographers(photographersData);
  }

  useEffect(() => {
    if (!isEdit) return;
    setPropertys();
  }, [isEdit, studio.id]);

  return (
    <div className="space-y-3 ">
      <h2 className="text-2xl font-bold">Photographer team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormControl>
          <FormLabel>Number of Photographers</FormLabel>
          <Select
            placeholder="Select"
            required
            value={numPhotographers}
            onChange={(_, newValue) => handleNumPhotographersChange(newValue)}
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
              <Option key={num} value={num}>
                {num}
              </Option>
            ))}
          </Select>
        </FormControl>

        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {photographers.map((photographer, index) => (
            <Card key={index} className="space-y-3" variant="outlined">
              <CardOverflow
                variant="soft"
                color="danger"
                sx={{
                  px: 0.2,
                  justifyContent: 'center',
                  fontSize: 'xs',
                  fontWeight: 'xl',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  borderLeft: '1px solid',
                  borderColor: 'divider',
                }}
              >
                Photographer {index + 1}
              </CardOverflow>
              <CardContent orientation="vertical">
                <FormControl>
                  <FormLabel>First Name:</FormLabel>
                  <Input
                    value={photographer.firstName}
                    onChange={(e) =>
                      handlePhotographerChange(
                        index,
                        'firstName',
                        e.target.value
                      )
                    }
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name:</FormLabel>
                  <Input
                    value={photographer.lastName}
                    onChange={(e) =>
                      handlePhotographerChange(
                        index,
                        'lastName',
                        e.target.value
                      )
                    }
                    required
                  />
                </FormControl>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotographerTeam;
