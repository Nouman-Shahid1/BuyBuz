import React from "react";
import { useCart } from "../../context/cartContext"; // Import cart context

const ProductCard = ({ id, name, price, originalPrice, brand, image }) => {
  const { addToCart } = useCart(); // Access `addToCart` function from the cart context

  // Handle Add to Cart
  const handleAddToCart = () => {
    const product = { id, name, price, image }; // Create a product object
    addToCart(product); // Add product to cart
  };

  return (
    <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform duration-300 hover:scale-105">
      {/* Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-80 w-full object-cover rounded-t-lg"
        />
        <span className="absolute top-2 left-2 bg-yellow-400 text-xs text-black font-semibold py-1 px-3 rounded-full uppercase">
          {brand}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 truncate">{name}</h2>
        <div className="flex items-center my-2">
          <p className="text-lg font-semibold text-blue-600">${price}</p>
          <del className="text-sm text-gray-500 ml-3">${originalPrice}</del>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
          <button
            className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
