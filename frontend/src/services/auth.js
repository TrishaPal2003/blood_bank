import API from "./api";

// Register
export const registerUser = (data) => API.post("/register/", data);

// Login
export const loginUser = async (data) => {
  const res = await API.post("/login/", data);

  // Store tokens
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data;
};

// Logout
export const logoutUser = async () => {
  try {
    await API.post("/logout/");
  } finally {
    localStorage.clear();
    window.location.href = "/login";
  }
};

// Auth helpers
export const isAuthenticated = () => !!localStorage.getItem("access");

export const getAccessToken = () => localStorage.getItem("access");

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
