import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

export const Header = () => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <header
      className="flex items-center justify-between flex-wrap bg-[#323232] px-6 py-2 w-full
      sticky top-0 z-10"
    >
      <div className="flex  ">
        <Link to="/">
          <img
            draggable="false"
            src="/images/Logo.png"
            alt="luxe vision logo"
            className="h-16 "
          />
        </Link>

        {!isMobile ? (
          <p className="font-light ">Your vision, your way</p>
        ) : null}
      </div>

      <Navbar isMobile={isMobile} />
    </header>
  );
};

export default Header;
