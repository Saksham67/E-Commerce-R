import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import ProductDetails from "./ProductDetails";

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {items.map((product) => (
        <ProductCard key={product._id} product={product} />
        // <ProductDetails key={product._id} product={product} />
      ))}
    </div>
  );
}



// import { useEffect, useState } from "react";
// import axios from "axios";

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:8080/api/products"); // 👈 backend API
//         setProducts(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p>Loading products...</p>;

//   return (
//     <div className="grid grid-cols-3 gap-6 p-6">
//       {products.map((product) => (
//         <div key={product._id} className="border p-4 rounded-lg shadow">
//           <h2 className="text-xl font-bold">{product.name}</h2>
//           <p>{product.description}</p>
//           <p className="text-green-600 font-semibold">₹{product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;
