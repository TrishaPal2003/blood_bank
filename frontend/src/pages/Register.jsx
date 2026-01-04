import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "donor",
    blood_group: "",
    phone: "",
    location: "",
  });

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/users/locations/");
        setLocations(res.data); // expect [{id: 0, district_name: "string"}]
      } catch (err) {
        console.error("Failed to load locations:", err);
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Donor must have blood group
    if (form.role === "donor" && !form.blood_group) {
      setMessage("❌ Blood group is required for donors");
      return;
    }

    if (form.password !== form.confirm_password) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Prepare payload: only include blood_group if donor
      const payload = { ...form };
      if (form.role !== "donor") delete payload.blood_group;

      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        payload
      );

      setMessage("✅ Registration successful! Logging in...");

      // Auto-login
      const loginRes = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        {
          username: form.username,
          password: form.password,
        }
      );

      const token = loginRes.data.access;
      if (token) localStorage.setItem("token", token);

      navigate("/dashboard/"); // unified dashboard
    } catch (err) {
      console.error("Registration/Login Error:", err.response?.data || err.message);
      const detail =
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data);
      setMessage("❌ " + detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="flex items-center justify-between w-[90%] max-w-5xl bg-white p-8 rounded-xl shadow-xl">
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Register</h2>

        <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
            required
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
            required
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
            required
          />

          {/* Role */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
            required
          >
            <option value="donor">Donor</option>
            <option value="hospital">Hospital</option>
          </select>

          {/* Blood group - show only if donor */}
          {form.role === "donor" && (
            <select
              name="blood_group"
              value={form.blood_group}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
              required={form.role === "donor"}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          )}

          {/* Location */}
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
            required
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.district_name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded font-semibold transition ${
              loading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>
        </div>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <div className="w-1/2 flex justify-center">
          <img src="/register.png" alt="Login" className="min-h-[50vh] object-contain" />
        </div>
    </div>
    </div>
  );
};

export default Register;
