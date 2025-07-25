
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
  const payload = {
    username: username,  
    password: password
  };

  axios.post("http://127.0.0.1:8000/api/users/login/", payload)
  .then((res) => {
    const token = res.data.token;

    if (token) {
      localStorage.setItem("token", token); 
      console.log("Token saved:", token);
    } else {
      console.warn("Token missing in response");
    }

    console.log("Login Successful", res.data);
    navigate('/profile'); 
  })
  .catch((err) => {
    console.error("Login Failed", err.response?.data || err.message);
  });
};

  return (
      
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
  <div className="flex items-center justify-between w-[90%] max-w-5xl bg-white p-8 rounded-xl shadow-xl">
   
    <div className="w-1/2 pr-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Login</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-200">
          Login
        </button>
      </div>
    </div>

   
    <div className="w-1/2 flex justify-center">
      <img
        src="/login.png"
        alt=""
        className="min-h-[50vh] object-contain"
      />
    </div>

  </div>
</div>

  )
}

export default Login

