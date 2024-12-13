import { Button, FormControl, FormLabel, Input, Typography } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/reducers/authReducer";
import store, { AppDispatch, RootState } from "@/store.ts";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validateField = useCallback((name: string, value: string) => {
    let error = "";

    if (name === "email" && value.trim() === "") {
      error = "Email is required.";
    } else if (name === "password" && value.trim() === "") {
      error = "Password is required.";
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      validateField(name, value);
    },
    [validateField]
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Final validation before submission
    const finalErrors: Record<string, string> = {};
    if (formData.email.trim() === "") {
      finalErrors.email = "Email is required.";
    }
    if (formData.password.trim() === "") {
      finalErrors.password = "Password is required.";
    }

    setFormErrors(finalErrors);

    if (Object.values(finalErrors).some((error) => error)) {
      return;
    }

    const emailLowercase = formData.email.toLowerCase();
    const quote = store.getState().bookings.quote;

    // Despacha el login con el correo en minúsculas
    dispatch(login({ ...formData, email: emailLowercase }))
      .unwrap()
      .then(() => {
        if (Object.keys(quote).length > 0) {
          setTimeout(() => {
            navigate("/confirm-quote");
          }, 500);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
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
          Log in
        </Typography>
        <form className="px-[40px] space-y-4 mt-8" onSubmit={handleSubmit}>
          {[
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
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
              {loading ? "Loading..." : "Log in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
