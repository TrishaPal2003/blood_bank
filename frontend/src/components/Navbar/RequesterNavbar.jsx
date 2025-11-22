import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RequesterNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-green-900 text-white py-2 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold uppercase">Blood Bank</h1>
        <ul className="hidden md:flex space-x-8 text-lg">
          <li><Link to="/requester/dashboard">Dashboard</Link></li>
          <li><Link to="/request-blood">Request Blood</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><button onClick={handleLogout} className="hover:text-gray-300">Logout</button></li>
        </ul>
      </div>
    </div>
  );
};

export default RequesterNavbar;
