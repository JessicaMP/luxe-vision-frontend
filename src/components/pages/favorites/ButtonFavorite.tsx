import { Icon } from "@iconify/react";
import IconButton from "@mui/joy/IconButton";
import { useState, useEffect, ButtonHTMLAttributes, ReactNode } from "react";
import { toggleFavorite } from "@/reducers/favoritesReducer";
import { useDispatch } from "react-redux";

interface ButtonFavoriteProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: number;
  status: boolean;
  classBtn?: string;
  children?: ReactNode; // Soporte para children
}

const ButtonFavorite: React.FC<ButtonFavoriteProps> = ({
  className,
  id,
  status,
  classBtn = "text-[#D05858] text-3xl",
  children,
}) => {
  const dispatch = useDispatch();
  const [statusIcon, setStatusIcon] = useState(status);

  const updateStatusIcon = async () => {
    try {
      await dispatch(toggleFavorite(id));
      setStatusIcon(!statusIcon);
    } catch (err) {
      console.error("Error toggling favorite: ", err);
    }
  };

  useEffect(() => {
    setStatusIcon(status);
  }, [status]);

  return (
    <div className={className}>
      <IconButton onClick={updateStatusIcon}>
        <Icon
          icon={
            statusIcon
              ? "fluent:heart-28-filled"
              : "fluent:heart-24-regular"
          }
          className={classBtn}
        />
        {children && <div className="pl-2">{children}</div>} {/* Renderiza los children */}
      </IconButton>
    </div>
  );
};

export default ButtonFavorite;
