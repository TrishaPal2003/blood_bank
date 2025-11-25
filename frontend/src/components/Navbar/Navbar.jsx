import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    setIsLoggedIn(!!token);

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setRole(user?.role || null);
      } catch (error) {
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ⭐ SWITCH-CASE MENU LOGIC
  const renderMenuByRole = () => {
    switch (role) {
      case "donor":
        return (
          <>
            <li><Link to="/donor/dashboard">Dashboard</Link></li>
            <li><Link to="/donor/history">Donation History</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        );

      case "hospital":
        return (
          <>
            <li><Link to="/hospital/dashboard">Dashboard</Link></li>
            <li><Link to="/hospital/requests">Manage Requests</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        );

      case "requester":
        return (
          <>
            <li><Link to="/requester/dashboard">Dashboard</Link></li>
            <li><Link to="/request-blood">Request Blood</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        );

      default:
        return (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/search-donor">Search Donor</Link></li>

            {!isLoggedIn && (
              <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </>
        );
    }
  };

  return (
    <div className="bg-red-900 text-white py-2 fixed top-0 left-0 w-full z-20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold uppercase">Blood Bank</h1>

        <ul className="hidden md:flex space-x-8 text-lg">
          {renderMenuByRole()}
        </ul>

        <div className="md:hidden">
          <GiHamburgerMenu className="text-3xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
