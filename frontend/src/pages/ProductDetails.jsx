import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../features/productSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="p-6">
      <img src={product.image} alt={product.name} className="w-full max-w-md mx-auto rounded-md" />
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-lg font-semibold mt-4">₹{product.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
        Add to Cart
      </button>
    </div>
  );
}
