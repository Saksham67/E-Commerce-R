// import axios from "axios";

// export const sendOrderSMS = async (to, order) => {
//   try {
//     const message = `✅ Order Confirmed!
// Order ID: ${order._id}
// Total: ₹${order.totalPrice}
// Payment: ${order.paymentMethod}
// Status: ${order.status}
// Thank you for shopping with us!`;

//     const response = await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "v3",
//         sender_id: "TXTIND",
//         message: message,
//         language: "english",
//         numbers: to, // must be 10-digit Indian number, e.g., 9876543210
//       },
//       {
//         headers: {
//           authorization: process.env.FAST2SMS_API_KEY,
//         },
//       }
//     );

//     console.log("SMS Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("SMS Error:", error.message);
//     throw error;
//   }
// };
// import axios from "axios";

// export const sendOrderSMS = async (to, order) => {
//   try {
//     const message = `Order Confirmed! ID: ${order._id}, Total: ₹${order.totalPrice}, Payment: ${order.paymentMethod}`;

//     const response = await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "q",               // ✅ quick SMS route
//         message: message,         // ✅ keep simple, one line
//         language: "english",
//         numbers: to               // ✅ e.g. "7000606483"
//       },
//       {
//         headers: {
//           authorization: process.env.FAST2SMS_API_KEY,
//           "Content-Type": "application/json"
//         },
//       }
//     );

//     console.log("SMS Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("SMS Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// import axios from "axios";

// export const sendOrderSMS = async (to, order) => {
//   try {
//     const message = `Order Confirmed! ID: ${order._id}, Total: ₹${order.totalPrice}, Payment: ${order.paymentMethod}`;

//     const response = await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "q",              // quick route
//         message: message,
//         language: "english",
//         numbers: to
//       },
//       {
//         headers: {
//           authorization: process.env.FAST2SMS_API_KEY,
//           "Content-Type": "application/json"
//         },
//       }
//     );

//     console.log("✅ SMS Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ SMS Error full:", error.response?.data || error.message);
//     throw error;
//   }
// };
import axios from "axios";
import qs from "qs";  // to format body as form data

export const sendOrderSMS = async (to, order) => {
  try {
    const message = `✅ Order Confirmed!
Order ID: ${order._id}
Total: ₹${order.totalPrice}
Payment: ${order.paymentMethod}
Status: ${order.status}
Thank you for shopping with us!`;

    const data = qs.stringify({
      route: "v3",
      sender_id: "TXTIND",
      message: message,
      language: "english",
      numbers: to
    });

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      data,
      {
        headers: {
          "authorization": process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    );

    console.log("SMS Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("SMS Error:", error.response?.data || error.message);
    throw error;
  }
};
