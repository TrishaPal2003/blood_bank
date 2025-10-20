import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 🔁 Detect path changes
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // 🔄 Re-check auth state on route change
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  // const handleLogout = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.post(
  //       'http://localhost:8000/api/logout/',
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     );
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("user");
  //     setIsLoggedIn(false); // 🔄 Update state
  //     navigate('/');
  //   } catch (err) {
  //     console.error("Logout error", err);
  //   }
  // };

  return (
    <div className="bg-red-900 text-white py-2 absolute top-0 left-0 w-full z-20 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold uppercase">Blood Bank</h1>

          <ul className="hidden md:flex space-x-10 text-xl menu menu-vertical lg:menu-horizontal  rounded-box">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
             <li><Link to="/search-donor">Search Donor</Link></li>

            {!isLoggedIn ? (
              <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
               
              </>
            ) : (
              <>
                <li><Link to="/blood-request">Posts</Link></li>
                <li><Link to="/request-blood">Blood Request</Link></li>
                <li><Link to="/donation-history">Donation History</Link></li>
                <li><Link to="/login">Profile</Link></li>

               
              </>
            )}
          </ul>
          

          <div className="md:hidden">
            <GiHamburgerMenu className="text-3xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
