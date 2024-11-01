import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

export const GeneralInformacion = () => {
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
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">General information</h2>
      <FormControl>
        <FormLabel>Studio Name:</FormLabel>
        <Input
          placeholder="Placeholder"
          value={form.studioName}
          onChange={(e) => handleProperty(e.target.value, "studioName")}
          required
        />
      </FormControl>
      {/* <div>
        <label>Studio Name:</label>
        <input
          type="text"
          value={form.studioName}
          onChange={(e) => handleProperty(e.target.value, 'studioName')}
          required
        />
      </div> */}
      <div>
        <label>Description:</label>
        <textarea
          value={form.description}
          onChange={(e) => handleProperty(e.target.value, "description")}
          required
        ></textarea>
      </div>
      <div>
        <label>Years of Experience:</label>
        <input
          type="number"
          value={form.yearsOfExperience}
          onChange={(e) => handleProperty(e.target.value, "yearsOfExperience")}
          required
        />
      </div>
    </div>
  );
};

export default GeneralInformacion;
