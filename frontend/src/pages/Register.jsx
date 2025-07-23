import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    blood_group: 'A+'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Write axios.post() HERE — inside handleSubmit()
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 Client-side validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // ✅ POST data to Django backend API
      const response = await axios.post('http://127.0.0.1:8000/api/users/register/', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        blood_group: formData.blood_group,
      });

      if (response.status === 201) {
        setSuccess('User registered successfully. Check your email.');
        setTimeout(() => navigate('/'), 2000); // redirect to homepage
      }
    } catch (err) {
  console.error("Full Axios Error:", err);
  console.error("Response:", err.response);
  console.error("Response Data:", err.response?.data);
  console.error("Response Status:", err.response?.status);
  setError(err.response?.data?.message || 'Registration failed.');
}
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
