import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#323232] px-6 w-full py-9 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#DADADA] border-opacity-50 pt-2 gap-6 sm:gap-0">
        <div className="flex flex-col lg:flex-row lg:items-center sm:flex-1">
          <Link to="/">
            <img
              src="/images/Logo.png"
              alt="luxe vision logo"
              className="h-16 w-auto"
            />
          </Link>

          <p className="font-light break-words text-white">
            Y© 2024 Luxevision. Todos los derechos reservados.
          </p>
        </div>
        <ul className="flex gap-3 sm:gap-2 items-center list-none">
          <li>
            <a
              href="#"
              className="p-2 rounded-full text-[#D05858] border border-[#D05858] inline-block"
            >
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="p-2 rounded-full text-[#D05858] border border-[#D05858] inline-block"
            >
              <IoLogoInstagram />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="p-2 rounded-full text-[#D05858] border border-[#D05858] inline-block"
            >
              <FaXTwitter />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
