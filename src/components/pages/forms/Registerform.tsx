import { Button, FormControl, FormLabel, Input, Typography } from "@mui/joy";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/reducers/authReducer";
import { RootState } from "src/store.ts";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.users);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setFormData((prevData) => {
        const updatedData = {
          ...prevData,
          [name]: value,
        };

        // Real-time validation
        validateField(name, value, updatedData);

        return updatedData;
      });
    },
    []
  );

  const validateField = (
    name: string,
    value: string,
    allValues: typeof formData
  ) => {
    let error = "";

    if (name === "firstName" && value.trim().length < 2) {
      error = "Must be at least 2 characters.";
    } else if (name === "lastName" && value.trim().length < 2) {
      error = "Must be at least 2 characters.";
    } else if (name === "email" && !emailRegex.test(value)) {
      error = "Invalid email address.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      error =
        "Password must be at least 8 characters, including a number and a special character.";
    } else if (name === "repeatPassword" && value !== allValues.password) {
      error = "Passwords do not match.";
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Final validation
    const finalErrors: any = {};
    if (formData.firstName.trim().length < 2) {
      finalErrors.firstName = "Must be at least 2 characters.";
    }
    if (formData.lastName.trim().length < 2) {
      finalErrors.lastName = "Must be at least 2 characters.";
    }
    if (!emailRegex.test(formData.email)) {
      finalErrors.email = "Invalid email address.";
    }
    if (!passwordRegex.test(formData.password)) {
      finalErrors.password =
        "Password must be at least 8 characters, including a number and a special character.";
    }
    if (formData.password !== formData.repeatPassword) {
      finalErrors.repeatPassword = "Passwords do not match.";
    }

    setFormErrors(finalErrors);

    if (Object.values(finalErrors).some((error) => error)) {
      return;
    }

    const userData = {
      firstName: formData.firstName.toLowerCase(),
      lastName: formData.lastName.toLowerCase(),
      email: formData.email.toLowerCase(),
      password: formData.password,
      repeatedPassword: formData.repeatPassword,
    };

    dispatch(register(userData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-28"
      style={{
        backgroundImage: `url('/images/bg-login.webp')`,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-[90%] max-w-[550px] bg-[#DADADA] shadow-[0_1px_5px_2px_#FFA987] rounded-[30px] p-10">
        <Typography
          className="text-center font-bold"
          style={{ color: "#D05858", fontSize: "40px" }}
        >
          Sign up
        </Typography>
        <form className="px-[40px] space-y-4 mt-8" onSubmit={handleSubmit}>
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            {
              label: "Repeat Password",
              name: "repeatPassword",
              type: "password",
            },
          ].map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              error={formErrors[field.name]}
              onChange={handleChange}
            />
          ))}
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-center">
            <Button
              type="submit"
              style={{
                backgroundColor: "#D05858",
                color: "#FFFFFF",
                width: "140px",
                height: "50px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                margin: "30px",
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
