import React, { useState } from 'react';
import axios from 'axios';
import API from "../services/api";

const BloodPostForm = ()=> {
  const [form, setForm] = useState({
  requester_name: '',
  requester_phone: '',
  blood_group: '',
  location: '', 
  required_bags: 1,
  message: '',
});


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


const handleSubmit = async (e) => {
  e.preventDefault();

  setSuccess("");
  setError("");

  try {
    const payload = {
      requester_name: form.requester_name,
      requester_phone: form.requester_phone,
      blood_group: form.blood_group,
      location: form.location_id,   // FK ID
      required_bags: form.required_bags,
      message: form.message,
    };

    const res = await API.post("/posts/requests/", payload);

    setSuccess("Blood request posted successfully. Donors will be notified.");

    // optional: reset form
    setForm({
      requester_name: "",
      requester_phone: "",
      blood_group: "",
      location_id: "",
      required_bags: 1,
      message: "",
    });

  } catch (err) {
    const msg =
      err.response?.data?.detail ||
      err.response?.data?.error ||
      "Failed to post blood request. Try again.";

    setError(msg);
  }
};



return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl p-10 space-y-6"
        >
          {/* Header */}
        <div className="bg-red-100 text-black py-16 mb-8 w-screen relative left-1/2 right-1/2 -mx-[50vw] text-center text-5xl font-bold">
      Place a Blood Request
    </div>




      {/* Name */}
      {success && (
      <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 font-semibold text-center">
        {success}
      </div>
    )}

    {error && (
      <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 font-semibold text-center">
        {error}
      </div>
    )}

      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg ">
          Name
        </label>
        <input
          type="text"
          name="requester_name"
          value={form.requester_name}
          onChange={handleChange}
          placeholder="Your full name"
          className="input w-full border-black "
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Phone Number
        </label>
        <input
          type="text"
          name="requester_phone"
          value={form.requester_phone}
          onChange={handleChange}
          placeholder="e.g. 017XXXXXXXX"
          className="input w-full border-black"
          required
        />
      </div>

      {/* Blood Group */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Blood Group
        </label>
        <select
          name="blood_group"
          value={form.blood_group}
          onChange={handleChange}
          className="input w-full border-black"
          required
        >
          <option value="">Select group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Enter hospital/city/area"
          className="input w-full border-black"
          required
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Urgency, number of bags, details..."
          className="w-full border border-black px-5 py-3 rounded-lg text-lg focus:ring-2 focus:ring-red-500 focus:outline-none h-32 resize-none"
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-red-600 text-white font-bold py-3 text-lg rounded-lg hover:bg-red-700 transition-all duration-200"
      >
        Post Request
      </button>
    </form>
  </div>
);


};
export default BloodPostForm


