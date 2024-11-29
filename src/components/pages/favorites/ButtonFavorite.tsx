import { Icon } from "@iconify/react";
import IconButton from "@mui/joy/IconButton";
import { useState, ButtonHTMLAttributes, useEffect } from "react";
import { toggleFavorite } from "@/reducers/favoritesReducer";
import { useDispatch } from "react-redux";

const ButtonFavorite = ({
  className,
  id,
  status,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const dispatch = useDispatch();
  const [statusIcon, setStatusIcon] = useState(false);

  const updateStatusIcon = () => {
    setStatusIcon(!statusIcon);
    saveStatus();
  };

  const saveStatus = async () => {
    try {
      await dispatch(toggleFavorite(id))
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    setStatusIcon(status);
  }, []);


  return (
    <div className={className}>
      <IconButton onClick={updateStatusIcon}>
        <Icon
          icon={
            statusIcon === true
              ? "fluent:heart-28-filled"
              : "fluent:heart-24-regular"
          }
          className="text-[#D05858] text-3xl"
        />
      </IconButton>
    </div>
  );
};

export default ButtonFavorite;
