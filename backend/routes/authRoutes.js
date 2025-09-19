// backend/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


// router.post("/login", (req, res, next) => {
//   console.log("Login route hit");
//   next();
// }, loginUser);

router.get("/profile", protect, getUserProfile);

export default router;
