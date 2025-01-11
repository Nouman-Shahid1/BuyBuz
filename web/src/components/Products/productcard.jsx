import React from "react";
import { useCart } from "../../context/cartContext";

const ProductCard = ({ id, name, price, originalPrice, brand, image }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = { id, name, price, image };
    addToCart(product);
  };

  return (
    <div className="relative max-w-xs bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg overflow-hidden border border-gray-300 hover:border-blue-600 transition-all">
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover rounded-t-xl"
        />
        
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate hover:text-blue-600 transition">
          {name}
        </h2>
        <div className="flex items-center mt-3">
          <p className="text-xl font-bold text-blue-600">${price}</p>
          {originalPrice && (
            <p className="text-sm text-gray-400 line-through ml-3">${originalPrice}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            Add to Cart
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
