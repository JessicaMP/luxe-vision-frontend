import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFeatures } from "@/selectors/studioSelector";
import React from "react";
import { AppDispatch } from "@/store";
import { fetchAllFeatures } from "@/reducers/featuresReducer";

interface FeaturesProps {
  onChangeInfo: (features: number[]) => void;
  isEdit?: boolean;
  initialData?: number[];
}

export const Features = ({
  onChangeInfo,
  isEdit = false,
  initialData = [],
}: FeaturesProps) => {
  const [list, setList] = useState<number[]>(initialData);
  const dispatch = useDispatch<AppDispatch>();
  const features = useSelector(selectFeatures);

  useEffect(() => {
    if (features.length === 0) {
      dispatch(fetchAllFeatures());
    }
  }, [dispatch, features.length]);

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
      <h2 className="text-2xl font-bold">Features</h2>
      <div role="group" aria-labelledby="topping">
        <List
          orientation="horizontal"
          wrap
          sx={{ "--List-gap": "8px", "--ListItem-radius": "20px" }}
        >
          {features.map((feature: any) => (
            <ListItem key={feature.id}>
              <Checkbox
                overlay
                disableIcon
                color="danger"
                variant={list.includes(feature.id) ? "solid" : "soft"}
                label={feature.featureName}
                value={feature.id}
                onChange={(e) => handleChange(e, feature.id)}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Features;
