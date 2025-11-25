import React from "react";
import Navbar from "../Navbar/Navbar";

const RequesterProfile = ({ data }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

     
      <aside className="w-72 bg-white border-r shadow-lg px-6 py-8 hidden md:block">
        <h1 className="text-2xl font-bold text-green-700 mb-8 mt-10">
          Requester Panel
        </h1>

        <ul className="space-y-2">
          <li>
            <a
              href="/requester/dashboard"
              className="block py-3 px-4 rounded-lg hover:bg-green-50 hover:text-green-700 font-medium"
            >
              Dashboard
            </a>  
          </li>

          <li>
            <a
              href="/request-blood"
              className="block py-3 px-4 rounded-lg hover:bg-green-50 hover:text-green-700 font-medium"
            >
              Request Blood
            </a>
          </li>

          <li>
            <a
              href="/requester/requests"
              className="block py-3 px-4 rounded-lg hover:bg-green-50 hover:text-green-700 font-medium"
            >
              My Requests
            </a>
          </li>

         
        </ul>
      </aside>

     
      <div className="flex-1 px-6 md:px-12 py-6 md:py-10">

        {/* Navbar */}
        <Navbar />

        {/* Profile Card */}
        <div className="bg-white mt-10 shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">

          <h2 className="text-3xl font-semibold text-green-700 mb-3">
            Requester Profile
          </h2>
          <p className="text-gray-600 mb-8">
            Your account details and blood request information
          </p>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.username}
              </p>
            </div>

            {/* Email */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.email}
              </p>
            </div>

            {/* Blood Needed */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Blood Needed</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.requested_blood_group || "Not Specified"}
              </p>
            </div>

            {/* Status */}
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-sm text-gray-500">Request Status</p>

              <span
                className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  data.active_request
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {data.active_request ? "Active" : "No Active Request"}
              </span>
            </div>

            {/* Address (Full Width) */}
            <div className="bg-gray-50 border rounded-xl p-5 md:col-span-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {data.address}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RequesterProfile;
