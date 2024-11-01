import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { specialties } from "@/assets/data/constant";
import { useState } from "react";

export const Specialty = ({ onChangeInfo }) => {
  const [list, setList] = useState<number[]>([]);

  const handleChange = (e: any, id: number) => {
    setList((prevList) => {
      const updatedList = e.target.checked
        ? prevList.includes(id) ? prevList : [...prevList, id]
        : prevList.filter((item) => item !== id);

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
          {specialties.map((specialty) => (
            <ListItem key={specialty.id}>
              <Checkbox
                overlay
                disableIcon
                variant={list.includes(specialty.id) ? "solid" : "soft"}
                label={specialty.name}
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
