
// // src/pages/Profile.jsx
// import { useEffect, useState } from "react";
// import { fetchProfile } from "../api/axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function Profile() {
//   const { token } = useSelector((state) => state.auth);
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const getProfile = async () => {
//       try {
//         const { data } = await fetchProfile();
//         setProfile(data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch profile");
//       }
//     };

//     getProfile();
//   }, [token, navigate]);

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!profile) return <p>Loading profile...</p>;

//   return (
//     <div className="max-w-md mx-auto p-6 border rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4">My Profile</h2>
//       <p><strong>Name:</strong> {profile.name}</p>
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
//       <p><strong>Address:</strong> {profile.address || "N/A"}</p>
//       <p><strong>Role:</strong> {profile.role}</p>
//     </div>
//   );
// }

// export default Profile;

// import { useEffect, useState } from "react";
// import { getMyOrders } from "../api/orderApi";

// function Profile() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await getMyOrders();
//         setOrders(data);
//       } catch (err) {
//         console.error("Fetch orders error:", err);
//       }
//     };
//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Profile</h2>

//       <h3 className="text-xl font-semibold mt-6">My Orders</h3>
//       {orders.length === 0 ? (
//         <p>No orders found</p>
//       ) : (
//         <div className="space-y-3 mt-3">
//           {orders.map((order) => (
//             <div key={order._id} className="border p-3 rounded">
//               <p><strong>Order ID:</strong> {order._id}</p>
//               <p><strong>Status:</strong> {order.status}</p>
//               <p><strong>Total:</strong> ₹
//                 {order.orderItems.reduce((acc, i) => acc + i.qty * i.product.price, 0)}
//               </p>
//               <ul className="list-disc ml-5 mt-2">
              
//                   <li key={item._id}>{item.product.name} × {item.qty}</li>
//                   {order.orderItems?.reduce((acc, i) => acc + i.qty * (i.product?.price || 0), 0)}
              
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;


// import { useEffect, useState } from "react";
// import { getMyOrders } from "../api/orderApi";
// import axios  from "axios";

// function Profile() {
//   const [orders, setOrders] = useState([]);

 

//   useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token"); // or however you store auth
//       const { data } = await axios.get("http://localhost:8080/api/orders/myorders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(data);
//     } catch (error) {
//       console.error("Fetch orders error:", error);
//     }
//   };

//   fetchOrders();
// }, []);


//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Profile</h2>

//       <h3 className="text-xl font-semibold mt-6">My Orders</h3>
//       {orders.length === 0 ? (
//         <p>No orders found</p>
//       ) : (
//         <div className="space-y-3 mt-3">
//           {orders.map((order) => (
//             <div key={order._id} className="border p-3 rounded">
//               <p><strong>Order ID:</strong> {order._id}</p>
//               <p><strong>Status:</strong> {order.status}</p>
//               <p>
//                 <strong>Total:</strong> ₹
//                 {order.orderItems?.reduce((acc, i) => acc + i.qty * (i.product?.price || 0), 0)}
//               </p>
//               <ul className="list-disc ml-5 mt-2">
//                 {order.orderItems?.map((item) => (
//                   <li key={item._id || item.product?._id}>
//                     {item.product?.name || "Unknown"} × {item.qty}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import users from "../../../backend/data/users";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // ✅ Fetch user info
//         const { data: userData } = await axios.get("http://localhost:8080/api/auth/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(userData);

//         // ✅ Fetch user orders
//         const { data: ordersData } = await axios.get("http://localhost:8080/api/orders/myorders", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(ordersData);
//       } catch (error) {
//         console.error("Dashboard fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   if (loading) {
//     return <div className="p-6 text-center">Loading dashboard...</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* ✅ User Info Section */}
//       {user && (
//         <div className="mb-8 p-6 bg-white rounded-2xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
//           <p><span className="font-medium">Name:</span> {user.name}</p>
//           <p><span className="font-medium">Email:</span> {user.email}</p>
//           <p>
//             <span className="font-medium">Joined:</span>{" "}
//             {new Date(user.createdAt).toLocaleDateString()}
//           </p>
//         </div>
//       )}

//       {/* ✅ Orders Section */}
//       <div className="p-6 bg-white rounded-2xl shadow">
//         <h2 className="text-2xl font-semibold mb-4">Order History</h2>

//         {orders.length === 0 ? (
//           <p className="text-gray-500">No orders found.</p>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 className="p-4 border rounded-lg bg-gray-50 shadow-sm"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="font-semibold">Order #{order._id.slice(-6)}</h3>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       order.status === "Delivered"
//                         ? "bg-green-100 text-green-700"
//                         : order.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-gray-200 text-gray-600"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Total:</span> ₹{order.totalPrice}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Placed on:</span>{" "}
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </p>

//                 {/* Show ordered items */}
//                 <ul className="mt-2 text-gray-600 list-disc list-inside">
//                   {order.orderItems.map((item) => (
//                     <li key={item._id}>
//                       {item.name} × {item.qty} — ₹{item.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // For updating profile
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ Fetch user info
        const { data: userData } = await axios.get("http://localhost:8080/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userData);
        setName(userData.name); // pre-fill form

        // ✅ Fetch user orders
        const { data: ordersData } = await axios.get("http://localhost:8080/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersData);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // ✅ Handle Profile Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        "http://localhost:8080/api/auth/profile",
        { name, password }, // password optional
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(data); // update UI with new info
      setUpdateMessage("Profile updated successfully!");
      setPassword(""); // clear password field
    } catch (error) {
      setUpdateMessage("Error updating profile. Try again.");
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* ✅ User Info Section */}
      {user && (
        <div className="mb-8 p-6 bg-white rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p>
            <span className="font-medium">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* ✅ Update Profile Section */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Password (optional)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>

        {updateMessage && (
          <p className="mt-4 text-green-600 font-medium">{updateMessage}</p>
        )}
      </div>

      {/* ✅ Orders Section */}
      <div className="p-6 bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-4 border rounded-lg bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Order #{order._id.slice(-6)}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">Total:</span> ₹{order.totalPrice}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Placed on:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <ul className="mt-2 text-gray-600 list-disc list-inside">
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      {item.name} × {item.qty} — ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
