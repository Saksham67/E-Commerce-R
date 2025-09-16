// config/razorpay.js
import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config(); // Load .env here also

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpayInstance;
