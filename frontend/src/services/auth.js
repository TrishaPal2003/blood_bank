import { api } from "./api";

// Register
export const registerUser = (data) => api.post("/users/register/", data);

// Login
export const loginUser = (data) => api.post("/users/login/", data);

// Set auth data
export const setAuthData = (access, refresh, user) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("user", JSON.stringify(user)); // store username, role, etc.
};

// Clear auth data
export const clearAuthData = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
};

// Check authentication
export const isAuthenticated = () => !!localStorage.getItem("access");

// Get token
export const getAccessToken = () => localStorage.getItem("access");
