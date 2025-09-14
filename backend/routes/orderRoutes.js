import express from "express";
import { createOrder, getMyOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User places an order
router.post("/", protect, createOrder);

// User fetches their orders
router.get("/myorders", protect, getMyOrders);

// Admin updates status
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
