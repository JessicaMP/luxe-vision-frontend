import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

const OutlineBtn = ({ nombre }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      size="lg"
      sx={{
        color: "white",
        borderColor: "#FFA987CC",
        borderRadius: "10px",
        "&:hover": {
          borderColor: "#FFA987CC",
          backgroundColor: "rgba(255, 169, 135, 0.1)",
        },
      }}
      onClick={() => navigate("/register")}
      component="a"
    >
      {nombre}
    </Button>
  );
};

export default OutlineBtn;
