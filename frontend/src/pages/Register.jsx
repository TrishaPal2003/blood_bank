import React, { useState } from "react";
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
    blood_group: "",
    role: "donor",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirm_password) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Register user
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        form
      );

      setMessage("✅ Registration successful! Logging in...");

      // 2️⃣ Auto-login
      const loginRes = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        {
          username: form.username,
          password: form.password,
        }
      );

      const token = loginRes.data.access; // SimpleJWT returns "access"
      if (token) localStorage.setItem("token", token);

      // 3️⃣ Redirect based on role
      switch (form.role) {
        case "donor":
          navigate("/dashboard/donor/");
          break;
        case "hospital":
          navigate("/dashboard/hospital/");
          break;
        case "requester":
          navigate("/dashboard/requester/");
          break;
        default:
          navigate("/profile");
      }
    } catch (err) {
      console.error("Registration/Login Error:", err.response?.data || err.message);
      const detail = err.response?.data?.detail || JSON.stringify(err.response?.data);
      setMessage("❌ " + detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-[450px]">
        <h2 className="text-2xl font-bold text-center mb-4 text-red-700">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <select
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
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

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="donor">Donor</option>
            <option value="hospital">Hospital</option>
            <option value="requester">Requester</option>
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
    </div>
  );
};

export default Register;
