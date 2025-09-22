import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      })
    );
  };

  return (
    <div className="border rounded p-4 shadow">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
