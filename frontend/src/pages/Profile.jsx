
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


import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orderApi";
import axios  from "axios";

function Profile() {
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const { data } = await getMyOrders();
  //       setOrders(data);
  //     } catch (err) {
  //       console.error("Fetch orders error:", err);
  //     }
  //   };
  //   fetchOrders();
  // }, []);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // or however you store auth
      const { data } = await axios.get("http://localhost:8080/api/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (error) {
      console.error("Fetch orders error:", error);
    }
  };

  fetchOrders();
}, []);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <h3 className="text-xl font-semibold mt-6">My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-3 mt-3">
          {orders.map((order) => (
            <div key={order._id} className="border p-3 rounded">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p>
                <strong>Total:</strong> ₹
                {order.orderItems?.reduce((acc, i) => acc + i.qty * (i.product?.price || 0), 0)}
              </p>
              <ul className="list-disc ml-5 mt-2">
                {order.orderItems?.map((item) => (
                  <li key={item._id || item.product?._id}>
                    {item.product?.name || "Unknown"} × {item.qty}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;


