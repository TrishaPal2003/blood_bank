
import React, { useState } from "react";
import DonorCard from "../components/DonorCard";

const mockDonors = [
  { id: 1, name: "Oronno Anam", blood_group: "AB+", district: "Dhaka" },
  { id: 2, name: "Maksudur Rahman", blood_group: "B+", district: "Brahmanbaria" },
  { id: 3, name: "Obaydul Ahmed Faraz", blood_group: "O+", district: "Munshiganj" },
  { id: 4, name: "Aditi", blood_group: "B+", district: "Dhaka" },
  { id: 5, name: "Md. Mehedi Hassan", blood_group: "O+", district: "Dhaka" },
  { id: 6, name: "Ali Ahsan", blood_group: "O+", district: "Sylhet" },
];

const SearchDonor = () => {
  const [filters, setFilters] = useState({
    blood_group: "",
    district: "",
    date: "",
    donor_type: "All",
  });

  const [filteredDonors, setFilteredDonors] = useState(mockDonors);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const result = mockDonors.filter((donor) => {
      return (
        (!filters.blood_group || donor.blood_group === filters.blood_group) &&
        (!filters.district || donor.district === filters.district)
      );
    });
    setFilteredDonors(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section */}
      <div className="bg-red-700 text-gray-600 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">রক্ত</h1>
        <ul className="hidden md:flex space-x-6 font-medium">
          {["Home", "About Us", "Search Donors", "Add Blood Request", "Register", "Login"].map(
            (item) => (
              <li key={item}>
                <a href="#" className="hover:text-gray-200 transition">
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Filter Section */}
      <div className="bg-red-100 py-12 px-20">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4 justify-center">

           <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Blood Group
        </label>
          <select
            name="blood_group"
            onChange={handleChange}
            className="select border-black w-48 text-gray-600 bg-white"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          </div>

           <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          District
        </label>
          <select
            name="district"
            onChange={handleChange}
            className="select border-black w-48 text-gray-600 bg-white"
          >
            <option value="">Select District</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Brahmanbaria">Brahmanbaria</option>
            <option value="Munshiganj">Cumilla</option>
            <option value="Sylhet">Sylhet</option>
          </select>
          </div>

          <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg ">
          Date of Donation
        </label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="input border-black w-48 text-gray-600 bg-white"
          />  
          </div>

           <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Donor Type
        </label>
          <select
            name="donor_type"
            onChange={handleChange}
            className="select border-black w-48 text-gray-600 bg-white"
          >
            <option>All</option>
            <option>Eligible</option>
          </select>
          </div>

          <button type="submit" className="btn bg-red-700 text-white shadow-lg hover:bg-red-600 mt-9">
            Search Donors
          </button>
        </form>
      </div>

      {/* Donor Count */}
      <div className="max-w-6xl mx-auto mt-6">
        <div className="bg-red-700 text-white text-lg font-semibold py-3 px-4 rounded-t-md">
          Total donors found {filteredDonors.length}.
        </div>

        {/* Donor Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white p-6">
          {filteredDonors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchDonor;

