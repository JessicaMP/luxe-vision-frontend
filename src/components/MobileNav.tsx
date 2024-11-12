import React from "react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import NormalBtn from "./Buttons/NormalBtn";
import OutlineBtn from "./Buttons/OutlineBtn";

const MobileNav = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        id="hamburger-menu"
        className="relative z-50 p-2 text-[#e8a87c] hover:text-[#ffd6ba] focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full px-4  bg-[#1c1c1c] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-[#e8a87c]">Menu</h2>
          <ul className="space-y-4 flex flex-col items-center">
            {menuItems.map((element, index) =>
              element.style == "NORMAL" ? (
                <NormalBtn key={index} element={element} />
              ) : (
                <OutlineBtn key={index} nombre={element.name} />
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
