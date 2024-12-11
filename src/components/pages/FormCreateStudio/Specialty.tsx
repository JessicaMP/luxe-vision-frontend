import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSpecialties } from "@/selectors/studioSelector";
import { fetchSpecialties } from "@/reducers/specialtiesReducer";
import React from "react";
import { StudioSpecialty } from "@/types/studio";
import { AppDispatch } from "@/store";

interface SpecialtyProps {
  onChangeInfo: (specialties: number[]) => void;
  isEdit?: boolean;
  initialData?: number[];
}

export const Specialty = ({
  onChangeInfo,
  isEdit = false,
  initialData = [],
}: SpecialtyProps) => {
  const [list, setList] = useState<number[]>(initialData);
  const dispatch = useDispatch<AppDispatch>();
  const specialties = useSelector(selectSpecialties) as StudioSpecialty[];

  useEffect(() => {
    if (specialties.length === 0) {
      dispatch(fetchSpecialties());
    }
  }, [dispatch, specialties.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setList((prevList) => {
      let updatedList;
      if (e.target.checked) {
        if (prevList.includes(id)) {
          updatedList = prevList.filter((item) => item !== id);
          e.target.checked = false;
        } else {
          updatedList = [...prevList, id];
        }
      } else {
        updatedList = prevList.filter((item) => item !== id);
      }

      onChangeInfo(updatedList);

      return updatedList;
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Specialty</h2>
      <div role="group" aria-labelledby="topping">
        <List
          orientation="horizontal"
          wrap
          sx={{ "--List-gap": "8px", "--ListItem-radius": "20px" }}
        >
          {specialties.map((specialty: any) => (
            <ListItem key={specialty.id}>
              <Checkbox
                overlay
                disableIcon
                color="danger"
                variant={list.includes(specialty.id) ? "solid" : "soft"}
                label={specialty.specialtyName}
                value={specialty.id}
                onChange={(e) => handleChange(e, specialty.id)}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Specialty;
