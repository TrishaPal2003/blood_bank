import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    blood_group: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.password !== form.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/users/register/', {
        username: form.username,
        email: form.email,
        password: form.password,
        confirm_password: form.confirm_password,  
        blood_group: form.blood_group,
      });
      console.log(res);

      if (res.status === 201 || res.status === 200) {
        toast.success("Registration successful!");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="flex items-center justify-between w-[90%] max-w-5xl bg-white p-8 rounded-xl shadow-xl">
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={form.confirm_password}
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

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-200"
            >
              Register
            </button>
          </form>
        </div>

        <div className="w-1/2 flex justify-center">
          <img
            src="/register.png"
            alt="Register illustration"
            className="min-h-[50vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
