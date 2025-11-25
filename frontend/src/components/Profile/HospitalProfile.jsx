import React from "react";
import Navbar from "../Navbar/Navbar";

const HospitalProfile = ({ data }) => (
<div className="drawer">
  <input id="hospital-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content min-h-screen bg-gray-50">
    <Navbar />
    <label htmlFor="hospital-drawer" className="btn drawer-button m-4">Open Sidebar</label>
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Hospital Profile</h2>
      <p><strong>Hospital Name:</strong> {data.hospital_name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Address:</strong> {data.address}</p>
      <p><strong>Contact:</strong> {data.phone}</p>
      <p><strong>Registered On:</strong> {new Date(data.date_joined).toLocaleDateString()}</p>
    </div>
  </div>
  <div className="drawer-side">
    <label htmlFor="hospital-drawer" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      <li><a href="/hospital/dashboard">Dashboard</a></li>
      <li><a href="/hospital/requests">My Requests</a></li>
    </ul>
  </div>
</div>

);

export default HospitalProfile;
