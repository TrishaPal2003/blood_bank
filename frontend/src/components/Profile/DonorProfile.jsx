import React from "react";
import Navbar from "../Navbar/Navbar";

const DonorProfile = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DonorNavbar />
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Donor Profile
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>Name:</strong> {data.username}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Blood Group:</strong> {data.blood_group}</p>
          <p><strong>Last Donation:</strong> {data.last_donation_date || "N/A"}</p>
          <p><strong>Availability:</strong> {data.is_available ? "Available" : "Unavailable"}</p>
          <p><strong>Address:</strong> {data.address}</p>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
