import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [showMobileMenu, setshowMobileMenu] = useState(false);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'; // Stop scrolling
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        
        {/* <img
          src={assets.logo}
          alt="Logo"
          className="w-14 h-auto"
        /> */}
        
        <ul className="hidden md:flex gap-8 text-white justify-center flex-1 text-xl">
          <li>
            <a href="#Header" className="cursor-pointer hover:text-gray-500">
              Home
            </a>
          </li>
          <li>
            <a href="#Properties" className="cursor-pointer hover:text-gray-500">
              Properties
            </a>
          </li>
        </ul>

        <img
          onClick={() => setshowMobileMenu(true)}
          src={assets.menuIcon}
          className="md:hidden w-7"
          alt="Menu Icon"
        />
      </div>

      {/*---------mobile menu----------*/}
      <div
        className={`md:hidden ${
          showMobileMenu ? 'fixed w-full' : 'hidden'
        } right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
      >
        <div className="flex justify-end p-6 cursor-pointer">
          <img
            onClick={() => setshowMobileMenu(false)}
            src={assets.crossIcon}
            className="w-6"
            alt="Close Icon"
          />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <a
            onClick={() => setshowMobileMenu(false)}
            href="#Header"
            className="px-4 py-2 rounded-full inline-block"
          >
            Home
          </a>

          <a
            onClick={() => setshowMobileMenu(false)}
            href="#Properties"
            className="px-4 py-2 rounded-full inline-block"
          >
            Properties
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;