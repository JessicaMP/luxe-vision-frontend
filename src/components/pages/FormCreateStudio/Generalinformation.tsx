import { useRef, useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";

export const GeneralInformacion = () => {
  const inputRef = useRef(null);

  const initialForm = {
    studioName: "",
    description: "",
    yearsOfExperience: "",
  };
  const [form, setForm] = useState({ ...initialForm });

  const handleProperty = (value: any, property: string) => {
    setForm({ ...form, [property]: value });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">General information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <FormControl>
          <FormLabel>Studio Name:</FormLabel>
          <Input
            value={form.studioName}
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
                min: 1
              },
            }}
            value={form.yearsOfExperience}
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
            value={form.description}
            onChange={(e) => handleProperty(e.target.value, "description")}
            required
          />
        </FormControl>
      </div>
    </div>
  );
};

export default GeneralInformacion;
