import React, { useState } from 'react';
import axios from 'axios';

export default function BloodPostForm() {
  const [form, setForm] = useState({
    blood_group: '',
    location: '',
    hospital_name: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/posts/requests/', form, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`, // or Bearer, based on your backend
        },
      });
      alert('✅ Blood request posted!');
    } catch (err) {
      console.error("Post error:", err);
      alert('❌ Error posting request');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-xl min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">Request Blood</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="blood_group"
          placeholder="Blood Group (e.g. A+)"
          value={form.blood_group}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="hospital_name"
          placeholder="Hospital Name"
          value={form.hospital_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Additional Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Post Request
        </button>
      </form>
    </div>
  );
}
