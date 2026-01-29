import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    setIsLoggedIn(!!token);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setOpen(false); // close menu on route change
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ---------- NAV SECTIONS ---------- */

  const publicLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/search-donor">Search Donor</Link></li>
      <li><Link to="/request-blood">Request Blood</Link></li>
    </>
  );

  const userLinks = (
    <>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/requests">Requests</Link></li>
      <li><Link to="/my-requests">My Requests</Link></li>
      <li><Link to="/request-blood">Request Blood</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </>
  );

  const hospitalLinks = (
    <>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/my-requests">Manage Requests</Link></li>
      <li><Link to="/requests">All Requests</Link></li>
      <li><Link to="/request-blood">Request Blood</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </>
  );

  const adminLinks = (
    <>
      <li><Link to="/admin">Admin</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
    </>
  );

  const renderLinks = () => {
    if (!isLoggedIn) return publicLinks;

    if (user?.isAdmin) return adminLinks;
    if (user?.isHospital) return hospitalLinks;

    return userLinks; // normal user (donor + requester)
  };

  /* ---------- UI ---------- */

  return (
    <nav className="bg-red-700 text-white fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold uppercase">
          Blood Bank
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
          {renderLinks()}

          {!isLoggedIn && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}

          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-red-800 px-4 py-4 space-y-3 text-sm">
          {renderLinks()}

          {!isLoggedIn && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}

          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-white text-red-700 w-full py-2 rounded"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
