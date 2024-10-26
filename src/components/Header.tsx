import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header
      className="flex items-center justify-between flex-wrap bg-[#323232] px-6 py-2 w-full
      sticky top-0 z-10"
    >
      <div className="flex items-center flex-1  ">
        <Link to="/">
          <img
            draggable="false"
            src="./Logo.png"
            alt="luxe vision logo"
            className="h-16 w-auto"
          />
        </Link>

        <p className="font-light ">Your vision, your way</p>
      </div>

      <Navbar />
    </header>
  );
};

export default Header;
