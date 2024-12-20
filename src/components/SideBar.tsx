import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Button from "@mui/joy/Button";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { performLogout } from "@/reducers/authReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store.ts";
import { bookingSlice } from "@/reducers/bookingReducer";

const menu = [
  {
    name: "List of photo studios",
    route: "/administration/",
  },
  {
    name: "Add photo studio",
    route: "/administration/create_studio",
  },
  {
    name: "Manage categories",
    route: "/administration/specialties",
  },
  {
    name: "Manage features",
    route: "/administration/features",
  },
  {
    name: "Users",
    route: "/administration/users",
  },
  {
    name: "Bookings",
    route: "/",
  },
  {
    name: "Account settings",
    route: "/",
  },
];

const SelectedList = () => {
  const location = useLocation();

  return (
    <List sx={{ minWidth: 200 }}>
      {menu.map((item, i) => (
        <ListItem key={i}>
          <ListItemButton
            color={location.pathname === item.route ? "danger" : undefined}
            sx={{
              color: location.pathname === item.route ? "danger" : "white",
              textAlign: "center",
            }}
            variant="plain"
            component={Link}
            to={item.route}
          >
            {item.name}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export const SideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <aside className="bg-[#323232] h-full py-10 space-y-5 fixed left-0 z-20 ">
      <h2 className="text-white text-2xl font-bold text-center">Admin</h2>
      <SelectedList />
      <Button
        size="lg"
        variant="plain"
        className="w-full"
        color="danger"
        sx={{
          color: "white",
        }}
        endDecorator={<TbLogout />}
        onClick={() => {
          dispatch(performLogout())
            .unwrap()
            .then(() => {
              navigate("/");
              dispatch(bookingSlice.actions.clearAll());
            })
            .catch((error) => {
              console.error("Error durante el logout:", error);
            });
        }}
      >
        Log out
      </Button>
    </aside>
  );
};

export default SideBar;
