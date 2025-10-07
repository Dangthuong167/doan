import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Header() {
  const { cart } = useCart();

  return (
    <header className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          MyShop
        </Link>

        {/* Menu */}
        <nav className="flex gap-6 items-center">
          <Link to="/" className="hover:text-indigo-500">
            Home
          </Link>
          <Link to="/products" className="hover:text-indigo-500">
            Sản phẩm
          </Link>
          <Link to="/cart" className="relative hover:text-indigo-500">
            <FaShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
