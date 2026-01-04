import React from "react";
const DonorCard = ({ donor }) => {
  return (
    <div className="bg-white text-gray-600 shadow-md rounded-xl p-4 flex flex-col items-center gap-2 border hover:shadow-lg transition transform hover:scale-105 duration-300">

      <img
        src="/man.jpg"
        alt="Donor"
        className="w-20 h-20 object-cover rounded-full border-2 border-red-400 shadow-sm"
      />

      <div className="items-center text-sm">
        <p><span className="font-bold">Name:</span> {donor.username}</p>

        <p>
          <span className="font-bold">Group:</span>{" "}
          <span className="text-red-500">
            <i className="fa-solid fa-droplet"></i> {donor.blood_group}
          </span>
        </p>

        <p>
          <span className="font-bold">District:</span>{" "}
          {donor.location?.district_name}
        </p>

        <p>
          <span className="font-bold">Last Donation:</span>{" "}
          {donor.last_donation_date ?? "Not donated"}
        </p>
      </div>
    </div>
  );
};


export default DonorCard;
