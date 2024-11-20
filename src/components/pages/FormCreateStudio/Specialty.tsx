import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSpecialties } from "@/selectors/studioSelector";
import { fetchSpecialties } from "@/reducers/specialtiesReducer";
import { selectStudio } from "@/selectors/studioSelector";

export const Specialty = ({ onChangeInfo, isEdit = false }: any) => {
  const studio = useSelector(selectStudio) || {};
  const [list, setList] = useState<number[]>([]);
  const dispatch = useDispatch();
  const specialties = useSelector(selectSpecialties) || [];

  const handleChange = (e: any, id: number) => {
    setList((prevList) => {
      const updatedList = e.target.checked
        ? prevList.includes(id)
          ? prevList
          : [...prevList, id]
        : prevList.filter((item) => item !== id);

      onChangeInfo(updatedList);
      return updatedList;
    });
  };

  const setPropertys = () => {
    const specialties = studio.studioSpecialties.map(
      (specialty: any) => specialty.specialty.id
    );
    setList([...specialties]);
  };

  useEffect(() => {
    if (specialties.length === 0) {
      dispatch(fetchSpecialties());
    }
  }, [specialties.length]);

  useEffect(() => {
    if (!isEdit) return;
    setPropertys();
  }, [isEdit, studio.id]);

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
