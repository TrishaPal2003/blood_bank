import { useState } from "react";
import axios from "axios";
import { setAuthData } from "../services/auth";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
 
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username,
        password,
      });
      console.log(res)
      setAuthData(res.data.token, res.data.user_id);
      alert("Login successful!");
      window.location.href = "/Profile"; 
   
  };

  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="flex items-center justify-between w-[90%] max-w-5xl bg-white p-8 rounded-xl shadow-xl">
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                   onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-200"
            >
              Login
            </button>
          </form>
        </div>

        <div className="w-1/2 flex justify-center">
          <img
            src="/login.png"
            alt="login illustration"
            className="min-h-[50vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
