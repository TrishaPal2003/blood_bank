import { useState } from "react";
import axios from "axios";
import { setAuthData } from "../services/auth";

// import { loginUser } from "../services/auth";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
 
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username,
        password,
      });
      setAuthData(res.data.token, res.data.user_id);
      alert("Login successful!");
      window.location.href = "/"; // Redirect to homepage
   
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80 space-x-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
