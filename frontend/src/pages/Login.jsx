import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleManualLogin = async () => {
  setLoading(true);
  setError("");
  try {
    const payload = { username, password };
    const res = await axios.post("http://127.0.0.1:8000/api/users/login/", payload);

    // store token
    localStorage.setItem("token", res.data.token);

    // store role for navbar
    localStorage.setItem("user", JSON.stringify({ role: res.data.role }));

    navigate("/profile");
  } catch (err) {
    setError(err.response?.data?.error || "Invalid credentials");
  } finally {
    setLoading(false);
  }
};


  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token); 
      const res = await axios.post("http://127.0.0.1:8000/api/users/google-login/", { token });
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/profile");
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="flex items-center justify-between w-[90%] max-w-5xl bg-white p-8 rounded-xl shadow-xl">
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Login</h2>

          <div className="space-y-4">
            {error && <p className="text-red-600 text-center">{error}</p>}

            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-black text-gray-600 bg-white rounded-md shadow-sm focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleManualLogin}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-200 disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">Or sign in with</p>
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError("Google login failed")} />
          </div>
        </div>

        <div className="w-1/2 flex justify-center">
          <img src="/login.png" alt="Login" className="min-h-[50vh] object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Login;
