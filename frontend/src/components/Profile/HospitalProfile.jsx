import React from "react";
import Navbar from "../Navbar/Navbar";

const HospitalProfile = ({ data }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-lg px-6 py-8 hidden md:block">
        <h1 className="text-2xl font-bold text-green-600 mb-8 mt-10">
          Hospital Panel
        </h1>

        <ul className="space-y-2">
          <li>
            <a
              href="/hospital/dashboard"
              className="block py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-700 font-medium"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/hospital/donations"
              className="block py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-700 font-medium"
            >
              Donation Requests
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 px-6 md:px-12 py-6 md:py-10">
        {/* Navbar */}
        <Navbar />

        {/* Profile Card */}
        <div className="bg-white mt-10 shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-green-600 mb-3">
            Hospital Profile
          </h2>
          <p className="text-gray-600 mb-8">
            Your hospital account details and location information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hospital Name */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Hospital Name</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.hospital_name || "Not Provided"}
              </p>
            </div>

            {/* Email */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.email}
              </p>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.account?.phone || "Not Provided"}
              </p>
            </div>

            {/* Address */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.account?.address || "Not Provided"}
              </p>
            </div>

            {/* Location */}
            <div className="bg-gray-50 border rounded-xl p-5 md:col-span-2">
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.account?.location?.district_name || "Not Provided"}
              </p>
            </div>

            {/* Role */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HospitalProfile;
