import React, { useEffect, useState } from "react";
import DonorCard from "../components/DonorCard";

const API_URL = "http://127.0.0.1:8000/api/users/donors/";
const LOCATIONS_API = "http://127.0.0.1:8000/api/users/locations/";

const SearchDonor = () => {
  const [filters, setFilters] = useState({
    blood_group: "",
    district: "",
    date: "",
    donor_type: "All",
  });

  const [donors, setDonors] = useState([]);
  const [locations, setLocations] = useState([]); // 🔹 store locations
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch donors
  useEffect(() => {
    fetchDonors();
  }, []);

  // 🔹 Fetch locations for dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch(LOCATIONS_API);
        const data = await res.json();
        setLocations(data); // set location array
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    };
    fetchLocations();
  }, []);

  const fetchDonors = async (queryParams = "") => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${queryParams}`);
      const data = await response.json();
      setDonors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch donors", error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.blood_group) params.append("blood_group", filters.blood_group);
    if (filters.district) params.append("location", filters.district); // location_id
    fetchDonors(`?${params.toString()}`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

          {/* Blood Group */}
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

           {/* District (dynamic from API) */}
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
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.district_name}
            </option>
          ))}
        </select>
      </div>

          {/* Date (future use) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Date of Donation
            </label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="input border-black w-48 text-gray-600 bg-white"
            />
          </div>

          {/* Donor Type (future use) */}
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
          {loading
            ? "Loading donors..."
            : `Total donors found ${donors.length}.`}
        </div>

        {/* Donor Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white p-6">
          {donors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDonor;
