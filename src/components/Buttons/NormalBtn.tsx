import Button from "@mui/joy/Button";
import { MenuItem } from "../../types/types";
import { useNavigate } from "react-router-dom";

type NormalBtnProps = {
  element: MenuItem;
};

const NormalBtn = ({ element }: NormalBtnProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="plain"
      size="lg"
      sx={{
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
      onClick={() => navigate(element.route)}
      component="a"
    >
      {element.name}
    </Button>
  );
};

export default NormalBtn;
