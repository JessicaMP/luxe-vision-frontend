import { useEffect, useRef, useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";

interface GeneralInformationProps {
  onChangeInfo: (data: any) => void;
  isEdit?: boolean;
  initialData?: any;
}

export const GeneralInformacion = ({
  onChangeInfo,
  isEdit = false,
  initialData = {},
}: GeneralInformationProps) => {
  const [formData, setFormData] = useState(initialData);
  const inputRef = useRef(null);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleProperty = (value: any, property: string) => {
    const updatedForm = { ...formData, [property]: value };
    setFormData(updatedForm);
    onChangeInfo(updatedForm);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">General information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <FormControl>
          <FormLabel>Studio Name:</FormLabel>
          <Input
            value={formData.studioName}
            onChange={(e) => handleProperty(e.target.value, "studioName")}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Years of Experience:</FormLabel>
          <Input
            type="number"
            slotProps={{
              input: {
                ref: inputRef,
                min: 1,
              },
            }}
            value={formData.yearsOfExperience}
            onChange={(e) =>
              handleProperty(e.target.value, "yearsOfExperience")
            }
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            size="lg"
            value={formData.description}
            onChange={(e) => handleProperty(e.target.value, "description")}
            required
          />
        </FormControl>
      </div>
    </div>
  );
};

export default GeneralInformacion;
