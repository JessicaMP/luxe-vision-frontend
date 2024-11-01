import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

export const Header = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

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
                className="h-16 "
              />
            </Link>

            {!isMobile ? (
              <Link to="/">
                <p className="font-light text-white">Your vision, your way</p>
              </Link>
            ) : null}
          </div>

          <Navbar isMobile={isMobile} />
        </div>
      </div>
    </header>
  );
};

export default Header;
