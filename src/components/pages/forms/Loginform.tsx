import { Button, FormControl, FormLabel, Input, Typography } from "@mui/joy";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/reducers/authSlice"; 
import { RootState } from "src/store.ts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.users);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const emailLowercase = formData.email.toLowerCase();

    // Despacha el login con el correo en minúsculas
    dispatch(login({ ...formData, email: emailLowercase }))
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
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backgroundBlendMode: "overlay"
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
          {["Email", "Password"].map((label, index) => (
            <FormControl key={index}>
              <FormLabel
                className="text-[#323232] font-bold text-[24px] mb-1"
                style={{ fontFamily: "inherit" }}
              >
                {label}
              </FormLabel>
              <Input
                name={label.toLowerCase()}
                type={label.toLowerCase() === "password" ? "password" : "text"}
                value={formData[label.toLowerCase()]}
                onChange={handleChange}
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
            </FormControl>
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
