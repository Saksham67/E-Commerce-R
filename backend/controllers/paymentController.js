// // controllers/paymentController.js
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import Order from '../models/order.js';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // @desc    Create order for payment
// // @route   POST /api/payment/razorpay
// // @access  Private/User
// export const createOrder = async (req, res) => {
//   try {
//     const { amount, currency = "INR", orderId } = req.body;

//     // Razorpay requires amount in paisa (multiply by 100)
//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: `order_rcptid_${orderId}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.status(200).json({
//       id: order.id,
//       currency: order.currency,
//       amount: order.amount,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error creating payment order", error: err.message });
//   }
// };

// // @desc    Verify payment
// // @route   POST /api/payment/verify
// // @access  Private/User
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       // Update order in DB to mark as Paid
//       const order = await Order.findById(orderId);
//       if (order) {
//         order.status = "Paid";
//         order.isPaid = true;
//         order.paidAt = Date.now();
//         await order.save();
//       }
//       res.status(200).json({ success: true, message: "Payment verified successfully" });
//     } else {
//       res.status(400).json({ success: false, message: "Invalid signature, payment failed" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error verifying payment", error: err.message });
//   }
// };
// controllers/paymentController.js
// import razorpayInstance from "../config/razorpay.js";
// import crypto from "crypto";
// import Order from "../models/order.js";

// // Create order
// export const createOrder = async (req, res) => {
//   try {
//     const { amount, currency = "INR", orderId } = req.body;

//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: `order_rcptid_${orderId}`,
//     };

//     const order = await razorpayInstance.orders.create(options);
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating payment order", error: err.message });
//   }
// };

// controllers/paymentController.js
import razorpayInstance from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/order.js";

// @desc Create order
// @route POST /api/payment/razorpay
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", orderId } = req.body;

    const options = {
      amount: amount * 100, // amount in paisa
      currency,
      receipt: `order_rcptid_${orderId}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating payment order", error: err.message });
  }
};

// @desc Verify payment
// @route POST /api/payment/verify
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Update order in DB
      const order = await Order.findById(orderId);
      if (order) {
        order.status = "Paid";
        order.isPaid = true;
        order.paidAt = Date.now();
        await order.save();
      }

      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature, payment failed" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error verifying payment", error: err.message });
  }
};
