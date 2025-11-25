import React from "react";
import Navbar from "../Navbar/Navbar";

const RequesterProfile = ({ data }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Requester Profile
      </h2>
      <p><strong>Name:</strong> {data.username}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Blood Needed:</strong> {data.requested_blood_group || "Not specified"}</p>
      <p><strong>Request Status:</strong> {data.active_request ? "Active" : "No active request"}</p>
      <p><strong>Address:</strong> {data.address}</p>
    </div>
  </div>
);

export default RequesterProfile;
