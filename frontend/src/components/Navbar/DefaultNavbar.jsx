import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useLocation } from 'react-router-dom';


const DefaultNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };



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
                
                <li><Link to="/request-blood">Blood Request</Link></li>
                {/* <li><Link to="/donation-history">Donation History</Link></li> */}
                <li><Link to="/profile">Profile</Link></li>
                 <button
                  onClick={handleLogout}
                  className="bg-white text-red-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
                >
                  Logout
                </button>
                      
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

export default DefaultNavbar;
