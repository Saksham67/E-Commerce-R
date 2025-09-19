import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-green-600 text-white">
      <Link to="/" className="font-bold">Frozen Foods</Link>
      <div className="space-x-4">
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
