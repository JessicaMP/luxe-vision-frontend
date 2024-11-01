import { forwardRef, useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { IMaskInput } from "react-imask";

interface TextMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskAdapter = forwardRef<HTMLInputElement, TextMaskProps>(function TextMaskAdapter(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) =>
        onChange({ target: { name: props.name, value: value as string } })
      }
      overwrite
    />
  );
});

export const ContactInformation = ({ onChangeInfo }) => {
  const initialForm = {
    email: "",
    phone: "",
  };
  const [form, setForm] = useState({ ...initialForm });

  const handleProperty = (value: any, property: string) => {
    const updatedForm = { ...form, [property]: value };
    setForm(updatedForm);
    onChangeInfo(updatedForm);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Contact information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input
            value={form.email}
            onChange={(e) => handleProperty(e.target.value, "email")}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Phone:</FormLabel>
          <Input
            value={form.phone}
            onChange={(e) => handleProperty(e.target.value, "phone")}
            slotProps={{ input: { component: TextMaskAdapter } }}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default ContactInformation;
