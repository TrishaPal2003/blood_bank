import React, { useEffect, useState } from "react";
import DonorProfile from "../components/Profile/DonorProfile";
import HospitalProfile from "../components/Profile/HospitalProfile";
import RequesterProfile from "../components/Profile/RequesterProfile";
import api from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    api.get("/users/profile/")
      .then((res) => {
        setProfile(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20">Loading profile...</div>;
  if (!profile) return <div className="text-center mt-20 text-red-500">Failed to load profile.</div>;

  switch (profile.role) {
    case "donor":
      return <DonorProfile data={profile} />;
    case "hospital":
      return <HospitalProfile data={profile} />;
    case "requester":
      return <RequesterProfile data={profile} />;
    default:
      return <div>Invalid role</div>;
  }
};

export default Profile;
