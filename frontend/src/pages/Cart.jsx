import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout"); // will redirect only if logged in (ProtectedRoute)
  };

  if (!cartItems.length) {
    return <p className="p-6">Your cart is empty</p>;
  }

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border-b py-2"
        >
          <div>
            <p>{item.name}</p>
            <p className="text-gray-600">₹{item.price} × {item.qty}</p>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(item._id))}
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 font-semibold">Total: ₹{total}</div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
