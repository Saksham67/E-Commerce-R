// // axios.js 
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api",
// });

// // Add JWT token automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // API calls
// export const registerUser = (formData) => api.post("/auth/register", formData);
// export const loginUser = (formData) => api.post("/auth/login", formData);

// export default api;

// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// JWT token interceptor
// 

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginUser = (formData) => API.post("/auth/login", formData);
export const registerUser = (formData) => API.post("/auth/register", formData);
export const fetchProfile = () => API.get("/auth/profile");

export default API;
