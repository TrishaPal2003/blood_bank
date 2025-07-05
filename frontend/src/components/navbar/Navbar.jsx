import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-primaryDark text-white py-2 absolute top-0 left-0 w-full z-20">
    <div className="container">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold uppercase">Blood Bank</h1>
        <ul className='flex space-x-14 text-xl'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        <div>
          <GiHamburgerMenu className='md:hidden text-3xl cursor-pointer'/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
