// // import { useSelector } from "react-redux";

// // function Checkout() {
// //   const { user } = useSelector((state) => state.auth);
// //   const { cartItems } = useSelector((state) => state.cart);

// //   const handlePlaceOrder = () => {
// //     // later we’ll connect with backend order API
// //     console.log("Order placed by:", user);
// //     console.log("Products:", cartItems);
// //   };

// //   if (!cartItems.length) {
// //     return <p>Your cart is empty</p>;
// //   }

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Checkout</h2>
// //       <div className="space-y-2">
// //         {cartItems.map((item) => (
// //           <div key={item._id} className="border p-2">
// //             <p>{item.name} - ₹{item.price} × {item.qty}</p>
// //           </div>
// //         ))}
// //       </div>
// //       <button
// //         onClick={handlePlaceOrder}
// //         className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
// //       >
// //         Place Order
// //       </button>
// //     </div>
// //   );
// // }

// // export default Checkout;

// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../features/cartSlice"
// import { useNavigate } from "react-router-dom";
// import { createOrder } from "../api/orderApi";
// import { useState } from "react";

// function Checkout() {
//   const { user, token } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handlePlaceOrder = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const orderData = {
//         orderItems: cartItems.map((item) => ({
//           product: item._id,
//           qty: item.qty,
//         })),
//         shippingAddress: {
//           address: user.address || "N/A",
//           phone: user.phone || "N/A",
//         },
//         paymentMethod: "COD", // we’ll expand later to online too
//       };

//       await createOrder(orderData);

//       dispatch(clearCart());
//       navigate("/profile"); // show orders in profile page
//     } catch (err) {
//       console.error("Checkout error:", err);
//       setError(err.response?.data?.message || "Order failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!cartItems.length) {
//     return <p className="p-6">Your cart is empty</p>;
//   }

//   const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//       {cartItems.map((item) => (
//         <div key={item._id} className="border-b py-2">
//           {item.name} - ₹{item.price} × {item.qty}
//         </div>
//       ))}

//       <div className="mt-4 font-semibold">Total: ₹{total}</div>

//       {error && <p className="text-red-600 mt-2">{error}</p>}

//       <button
//         onClick={handlePlaceOrder}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
//       >
//         {loading ? "Placing Order..." : "Place Order"}
//       </button>
//     </div>
//   );
// }

// export default Checkout;

// src/pages/Checkout.jsx
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/orderApi";
import { clearCart } from "../features/cartSlice";

export default function Checkout() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Prefill shipping fields from user if available
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // or "Online"

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cartItems]
  );

  const handlePlaceOrder = async () => {
    setError(null);

    // Basic front-end validation
    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }
    if (!address || !city || !postalCode || !country || !phone) {
      setError("Please fill all shipping fields and phone number.");
      return;
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      shippingAddress: {
        address,
        city,
        postalCode,
        country,
      },
      phone,
      totalPrice,
      paymentMethod,
    };

    try {
      setLoading(true);
      const res = await createOrder(orderData);

      // success
      dispatch(clearCart());
      // optionally show created order id / message
      const createdOrder = res.data;
      navigate("/profile"); // route where user sees their orders
    } catch (err) {
      console.error("Place order error:", err);
      // server message might be nested; prefer readable message
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Order failed";
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return <p className="p-6">Your cart is empty</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Shipping Details</h3>
          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            placeholder="Phone (10 digits)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />

          <h3 className="font-semibold mt-4 mb-2">Payment Method</h3>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                name="payment"
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <span>Cash on Delivery (COD)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                name="payment"
                type="radio"
                checked={paymentMethod === "Online"}
                onChange={() => setPaymentMethod("Online")}
              />
              <span>Online Payment</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Order Summary</h3>

          <div className="border rounded p-4 mb-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between py-2">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    ₹{item.price} × {item.qty}
                  </div>
                </div>
                <div className="font-semibold">₹{item.price * item.qty}</div>
              </div>
            ))}

            <div className="border-t mt-3 pt-3 text-right font-bold">
              Total: ₹{totalPrice}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 p-2 rounded mb-3">
              {String(error)}
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
