import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaTint, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://127.0.0.1:8000/api/users/profile/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Profile Data", res.data);
      setProfileData(res.data); // ⬅️ Store profile info
    })
    .catch((err) => {
      console.log("Error Found", err);
      navigate("/login"); // Redirect if token is invalid
    });
  },);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-2xl mt-12">
      <div className="flex items-center space-x-6 mb-8">
        {/* <img
          src="/avatar.png" // Replace with real profile pic if available
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-red-500 object-cover"
        /> */}
        <div>
          <h1 className="text-3xl font-bold text-red-600">{profileData?.user?.username}</h1>
          <p className="text-gray-600">{profileData?.user?.email}</p>
        </div>
      </div>

      <div className="space-y-4 text-gray-700">
        <div className="flex items-center">
          <FaUser className="mr-3 text-red-500" />
          <span><strong>Full Name:</strong> {profileData?.user?.first_name} {profileData?.user?.last_name}</span>
        </div>

        <div className="flex items-center">
          <FaEnvelope className="mr-3 text-red-500" />
          <span><strong>Email:</strong> {profileData?.user?.email}</span>
        </div>

        <div className="flex items-center">
          <FaMapMarkerAlt className="mr-3 text-red-500" />
          <span><strong>Address:</strong> {profileData?.adress}</span>
        </div>

        <div className="flex items-center">
          <FaTint className="mr-3 text-red-500" />
          <span><strong>Blood Group:</strong> {profileData?.blood_group}</span>
        </div>

        <div className="flex items-center">
          <FaCalendarAlt className="mr-3 text-red-500" />
          <span><strong>Last Donation Date:</strong> {profileData?.last_donation_date || "N/A"}</span>
        </div>

        <div className="flex items-center">
          {profileData?.is_available ? (
            <FaCheckCircle className="mr-3 text-green-600" />
          ) : (
            <FaTimesCircle className="mr-3 text-gray-500" />
          )}
          <span><strong>Available for Donation:</strong> {profileData?.is_available ? "Yes" : "No"}</span>
        </div>
      </div>

      <button
        className="mt-8 bg-red-600 hover:bg-red-700 transition duration-200 text-white px-6 py-2 rounded-lg shadow-md w-full font-semibold"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
