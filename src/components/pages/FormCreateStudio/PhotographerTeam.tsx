import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import Input from "@mui/joy/Input";
import React from "react";
import { Photographer } from "@/types";

interface PhotographerTeamProps {
  onChangeInfo: (photographers: Photographer[]) => void;
  isEdit?: boolean;
  initialData?: Photographer[];
}

export const PhotographerTeam = ({
  onChangeInfo,
  isEdit = false,
  initialData = [],
}: PhotographerTeamProps) => {
  const [numPhotographers, setNumPhotographers] = useState(
    initialData.length || 1
  );
  const [photographers, setPhotographers] = useState<Photographer[]>(
    initialData.length ? initialData : [{ firstName: "", lastName: "" }]
  );

  useEffect(() => {
    if (!initialData.length) {
      setPhotographers([{ firstName: "", lastName: "" }]);
      setNumPhotographers(1);
    } else {
      setPhotographers(initialData);
      setNumPhotographers(initialData.length);
    }
  }, [initialData]);

  const handleNumPhotographersChange = (e: number) => {
    if (e > photographers.length) {
      const newPhotographers = Array.from(
        { length: e - photographers.length },
        () => ({ firstName: "", lastName: "" })
      );
      const updatedPhotographers = [...photographers, ...newPhotographers];
      setPhotographers(updatedPhotographers);
      onChangeInfo(updatedPhotographers);
    } else {
      const updatedPhotographers = photographers.slice(0, e);
      setPhotographers(updatedPhotographers);
      onChangeInfo(updatedPhotographers);
    }
    setNumPhotographers(e);
  };

  const handlePhotographerChange = (
    index: number,
    field: keyof Photographer,
    value: string
  ) => {
    const updatedPhotographers = [...photographers];
    updatedPhotographers[index] = {
      ...updatedPhotographers[index],
      [field]: value,
    };
    setPhotographers(updatedPhotographers);
    onChangeInfo(updatedPhotographers);
  };

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
            onChange={(_, newValue) =>
              handleNumPhotographersChange(newValue as number)
            }
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
                  justifyContent: "center",
                  fontSize: "xs",
                  fontWeight: "xl",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  borderLeft: "1px solid",
                  borderColor: "divider",
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
                        "firstName",
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
                        "lastName",
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
