import React, { useEffect, useState } from "react";
import DonorProfile from "../components/Profile/DonorProfile";
import HospitalProfile from "../components/Profile/HospitalProfile";
import RequesterProfile from "../components/Profile/RequesterProfile";
import api from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile/");
        setProfile(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-20 text-red-500">
        No profile data found.
      </div>
    );
  }

  // Role-based rendering
  switch (profile.role) {
    case "donor":
      return <DonorProfile data={profile} />;
    case "hospital":
      return <HospitalProfile data={profile} />;
    case "requester":
      return <RequesterProfile data={profile} />;
    default:
      return (
        <div className="text-center mt-20 text-red-500">
          Invalid role: {profile.role}
        </div>
      );
  }
};

export default Profile;
