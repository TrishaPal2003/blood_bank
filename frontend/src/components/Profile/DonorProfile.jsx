import React from "react";
import Navbar from "../Navbar/Navbar";

const DonorProfile = ({ data }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-72 bg-white border-r shadow-lg px-6 py-8 hidden md:block">
        <h1 className="text-2xl font-bold text-red-600 mb-8 mt-10">
          Donor Panel
        </h1>

        <ul className="space-y-2">
          <li>
            <a
              href="/donor/dashboard"
              className="block py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-700 font-medium"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/donor/requests"
              className="block py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-700 font-medium"
            >
              My Donations
            </a>
          </li>
        </ul>
      </aside>

      <div className="flex-1 px-6 md:px-12 py-6 md:py-10">
        {/* Navbar */}
        <Navbar />

        {/* Profile Card */}
        <div className="bg-white mt-10 shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-red-600 mb-3">
            Donor Profile
          </h2>
          <p className="text-gray-600 mb-8">
            Your account details and donation information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{data.username}</p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{data.email}</p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Blood Group</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{data.blood_group || "Not Specified"}</p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Last Donation</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{data.last_donation_date || "N/A"}</p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Availability</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{data.is_available ? "Available" : "Unavailable"}</p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-5 md:col-span-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{data.address || "Not Provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
