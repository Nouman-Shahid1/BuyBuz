import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingCart } from 'react-icons/hi'; // Import outline icons
import Logo from "../assets/h.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const [isScrolled, setIsScrolled] = useState(false); // State for scroll detection
  const [userName, setUserName] = useState(null); // State to store the user's name

  // Detect scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem('name');
    console.log('Stored User Name:', storedUserName); // Debugging: Log the retrieved name
    if (storedUserName) {
        setUserName(storedUserName);
    }
}, []);



  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-10 transition-all duration-300 ${
          isScrolled ? 'bg-gray-100 shadow-md' : 'bg-white'
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
            className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
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
              <li>
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 px-3 py-2 transition-transform transform hover:scale-105"
                >
                  <HiOutlineShoppingCart className="w-6 h-6 text-gray-800 hover:text-gray-600" />
                </Link>
              </li>
              <li>
                {userName ? (
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <HiOutlineUser className="w-6 h-6 text-gray-800 hover:text-gray-600" />
                    <span className="text-base font-medium text-gray-800">
                      {userName}
                    </span>
                  </div>
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
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
