import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi"; // Import outline icons
import Logo from "../assets/h.png";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const [isScrolled, setIsScrolled] = useState(false); // State for scroll detection
  const [userName, setUserName] = useState(null); // State to store the user's name
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false); // State for cart dropdown
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false); // State for account dropdown

  const { cart, addToCart, removeFromCart, clearCart, updateQuantity } = useCart(); // Access cart context


  const cartDropdownRef = useRef(null); // Ref for cart dropdown
  const accountDropdownRef = useRef(null); // Ref for account dropdown

  // Detect scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("name");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
    setAccountDropdownOpen(false); // Close account dropdown if open
  };

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
    setCartDropdownOpen(false); // Close cart dropdown if open
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target)
      ) {
        setCartDropdownOpen(false);
      }
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-10 transition-all duration-300 ${
        isScrolled ? "bg-gray-100 shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} className="h-10 rounded-full" alt="Logo" />
          <span className="self-center text-base font-semibold text-gray-800">
            AH-BUYBUZZ
          </span>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <div
          className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col md:flex-row items-center md:space-x-8 mt-4 md:mt-0 bg-opacity-90 md:bg-transparent text-gray-800">
          <li>
                <Link
                  to="/"
                  className="text-base font-medium transition-colors duration-300 hover:text-gray-600 px-3 py-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-base font-medium transition-colors duration-300 hover:text-gray-600 px-3 py-2"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-base font-medium transition-colors duration-300 hover:text-gray-600 px-3 py-2"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base font-medium transition-colors duration-300 hover:text-gray-600 px-3 py-2"
                >
                  Contact
                </Link>
              </li>

            {/* Cart Dropdown */}
            <li className="relative" ref={cartDropdownRef}>
  <button
    onClick={toggleCartDropdown}
    className="flex items-center space-x-2 px-3 py-2 relative"
  >
    <HiOutlineShoppingCart className="w-6 h-6 text-gray-800 hover:text-gray-600" />
    {cart.items.length > 0 && (
      <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {cart.items.reduce((total, item) => total + item.quantity, 0)}
      </span>
    )}
  </button>

  {cartDropdownOpen && (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-4">
        <h3 className="font-bold text-lg">Your Cart</h3>
        {cart.items.length === 0 ? (
          <p className="text-gray-500 text-sm mt-2">Your cart is empty.</p>
        ) : (
          <ul className="mt-2 space-y-3 max-h-64 overflow-y-auto">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                {/* Product Info */}
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x ${item.price}
                  </p>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  {/* Decrement Button */}
                  <button
                    onClick={() =>
                      item.quantity > 1
                        ? updateQuantity(item.id, item.quantity - 1)
                        : removeFromCart(item.id)
                    }
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  {/* Quantity */}
                  <span className="text-sm font-semibold">{item.quantity}</span>
                  {/* Increment Button */}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                {/* Total Price */}
                <p className="text-sm font-semibold text-gray-800 ml-3">
                  ${item.quantity * item.price}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total and Buttons */}
      {cart.items.length > 0 && (
        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold text-blue-600">
              ${cart.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:underline"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="text-sm text-blue-500 hover:underline"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )}
</li>

            {/* Account Dropdown */}
            <li className="relative" ref={accountDropdownRef}>
              {userName ? (
                <button
                  onClick={toggleAccountDropdown}
                  className="flex items-center space-x-2 px-3 py-2 cursor-pointer"
                >
                  <HiOutlineUser className="w-6 h-6 text-gray-800 hover:text-gray-600" />
                  <span className="text-base font-medium text-gray-800">
                    {userName}
                  </span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-3 py-2 transition-transform transform hover:scale-105"
                >
                  <HiOutlineUser className="w-6 h-6 text-gray-800 hover:text-gray-600" />
                  <span className="text-base font-medium text-gray-800 hover:text-gray-600">
                    Account
                  </span>
                </Link>
              )}
              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
