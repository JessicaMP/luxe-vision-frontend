import React from "react";
import { FormControl, FormLabel, Input } from "@mui/joy";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  name,
  type,
  value,
  error,
  onChange,
}: InputFieldProps) => (
  <FormControl>
    <FormLabel
      className="text-[#323232] font-bold text-[24px] mb-1"
      style={{ fontFamily: "inherit" }}
    >
      {label}
    </FormLabel>
    <Input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      sx={{
        backgroundColor: "#DADADA",
        border: "1px solid #323232",
        borderRadius: "15px",
        width: "100%",
        height: "40px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        fontFamily: "inherit",
      }}
    />
    {error && <p className="text-red-500">{error}</p>}
  </FormControl>
);

export default InputField;
