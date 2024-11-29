import Button from "@mui/joy/Button";
import { MenuItem } from "../../types";

type NormalBtnProps = {
  element: MenuItem;
};

const NormalBtn = ({ element }: NormalBtnProps) => {
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
      href={element.route}
      component="a"
    >
      {element.name}
    </Button>
  );
};

export default NormalBtn;
