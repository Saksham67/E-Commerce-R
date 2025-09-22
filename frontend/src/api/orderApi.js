import axios from "axios";
// src/api/orderApi.js
 // your existing axios instance that sets baseURL + Authorization



const API = axios.create({ baseURL: "http://localhost:8080/api" });

// Attach token for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Create order
export const createOrder = (orderData) => API.post("/orders", orderData);

// Get logged-in user orders
export const getMyOrders = () => API.get("/orders/myorders");
