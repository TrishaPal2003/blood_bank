import React, { useState } from 'react';
import axios from 'axios';

const BloodPostForm = ()=> {
  const [form, setForm] = useState({
    requester_name: '',
    requester_phone_number: '',
    blood_group: '',
    location: '',
    message: '',
    
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending form data:", form);

    try {
      await axios.post('http://127.0.0.1:8000/api/posts/requests/', form, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`, 
        },
      });
      alert('✅ Blood request posted!');
    } catch (err) {
      console.error("Post error:", err);
      alert('❌ Error posting request');
    }
    console.log("Token:", localStorage.getItem('token'));

  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-xl">
  <h2 className="text-2xl font-semibold mb-4 text-center">Request Blood</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-gray-700 font-medium mb-1">Name</label>
      <input
        type="text"
        name="requester_name"
        placeholder="Your name"
        value={form.requester_name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
      <input
        type="text"
        name="requester_phone_number"
        placeholder="Phone number"
        value={form.requester_phone_number}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Blood Group</label>
      <select
        name="blood_group"
        value={form.blood_group}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="">Select blood group</option>
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

    <div>
      <label className="block text-gray-700 font-medium mb-1">Location</label>
      <input
        type="text"
        name="location"
        placeholder="City/Hospital/Area"
        value={form.location}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Message</label>
      <textarea
        name="message"
        placeholder="Urgency, units needed, etc."
        value={form.message}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-200"
    >
      Post Request
    </button>
  </form>
</div>

  );
};
export default BloodPostForm


//  <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="blood_group"
//           placeholder="Blood Group (e.g. A+)"
//           value={form.blood_group}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={form.location}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="hospital_name"
//           placeholder="Hospital Name"
//           value={form.hospital_name}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <textarea
//           name="message"
//           placeholder="Additional Message"
//           value={form.message}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
//           Post Request
//         </button>
//       </form>