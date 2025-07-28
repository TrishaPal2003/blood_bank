import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, clearAuthData, getToken } from '../../services/auth';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/logout/',
        {},
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );
      clearAuthData();
      alert("Logged out successfully");
      navigate('/');
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div className="bg-primaryDark text-white py-2 absolute top-0 left-0 w-full z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold uppercase">Blood Bank</h1>
         <ul className='hidden md:flex space-x-10 text-xl'>
  <li><Link to="/">Home</Link></li>
  <li><Link to="/about">About Us</Link></li>

  {!isAuthenticated() ? (
    <>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </>
  ) : (
    <>
      <li><Link to="/search-donor">Search Donor</Link></li>
      <li><Link to="/blood-request">Blood Request</Link></li>
      <li><Link to="/donation-history">Donation History</Link></li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  )}
</ul>

          <div className="md:hidden">
            <GiHamburgerMenu className='text-3xl cursor-pointer'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
