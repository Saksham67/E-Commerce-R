// routes/paymentRoutes.js
import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/razorpay", protect, createOrder);
router.post("/verify", protect, verifyPayment);

export default router;
