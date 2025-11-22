import React, { useEffect, useState } from "react";
import DefaultNavbar from "./DefaultNavbar";
import DonorNavbar from "./DonorNavbar";
import HospitalNavbar from "./HospitalNavbar";
import RequesterNavbar from "./RequesterNavbar";

const RoleNavbar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setRole(user?.role || null);
      } catch (err) {
        console.warn("Failed to parse user from localStorage:", err);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, []);

  switch (role) {
    case "donor":
      return <DonorNavbar />;
    case "hospital":
      return <HospitalNavbar />;
    case "requester":
      return <RequesterNavbar />;
    default:
      return <DefaultNavbar />;
  }
};

export default RoleNavbar;
