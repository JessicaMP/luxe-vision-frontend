import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery, Menu, MenuItem, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "src/store.ts";
import { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { fetchProfile, performLogout } from "@/reducers/authReducer";
import { bookingSlice } from "@/reducers/bookingReducer";

export const Header = ({ isLogin = false }: any) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { isAuthenticated, user, loading } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isAuthenticated && !user && !loading) {
      dispatch(fetchProfile()); // Esto solo se ejecuta si el usuario no está en el estado
    }
  }, [isAuthenticated, user, dispatch, loading]);

  return (
    <header className="bg-[#323232] fixed top-0 w-full z-20">
      <div className="container mx-auto">
        <div
          className="flex items-center justify-between flex-wrap px-6 py-2 w-full
      sticky top-0 z-20"
        >
          <div className="flex items-center ">
            <Link to="/">
              <img
                draggable="false"
                src="/images/Logo.png"
                alt="luxe vision logo"
                className={`h-${isMobile ? "12" : "16"}`}
                id="logo-luxe-vision"
              />
            </Link>

            {!isMobile && (
              <Link to="/">
                <p id="slogan" className="font-light text-white">
                  Your vision, your way
                </p>
              </Link>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4 text-white">
              {!isMobile && (
                <span className="mr-2 text-lg">
                  Welcome,{" "}
                  {user?.firstName
                    ? user?.firstName.charAt(0).toUpperCase() +
                      user?.firstName.slice(1)
                    : ""}
                </span>
              )}
              <div
                className={`flex items-center justify-center rounded-full
              ${isMobile ? "w-8 h-8 text-base" : "w-12 h-12 text-2xl"}
              bg-[#FFA987] text-white font-bold`}
              >
                {user?.firstName?.charAt(0).toUpperCase() || "U"}
              </div>

              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="text-white"
              >
                <MdMenu size={isMobile ? 20 : 24} color="white" />
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My profile</MenuItem>
                {user?.role === "ROLE_CUSTOMER" && (
                  <MenuItem
                    onClick={() => {
                      navigate("/bookings"); // Redirige al panel de bookings
                    }}
                  >
                    Reservations
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    navigate("/favorites"); // Redirige al panel de administrador
                  }}
                >
                  Favorites list
                </MenuItem>
                {user?.role === "ROLE_ADMINISTRATOR" && (
                  <MenuItem
                    onClick={() => {
                      navigate("/administration"); // Redirige al panel de administrador
                      handleClose();
                    }}
                  >
                    Panel
                  </MenuItem>
                )}
                <MenuItem
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
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Navbar isMobile={isMobile} isLogin={isLogin} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
