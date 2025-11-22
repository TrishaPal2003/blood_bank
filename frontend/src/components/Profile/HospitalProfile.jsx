import React from "react";
import HospitalNavbar from "../Navbar/HospitalNavbar";

const HospitalProfile = ({ data }) => (
  <div className="min-h-screen bg-gray-50">
    <HospitalNavbar />
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        Hospital Profile
      </h2>
      <p><strong>Hospital Name:</strong> {data.hospital_name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Address:</strong> {data.address}</p>
      <p><strong>Contact:</strong> {data.phone}</p>
      <p><strong>Registered On:</strong> {new Date(data.date_joined).toLocaleDateString()}</p>
    </div>
  </div>
);

export default HospitalProfile;
