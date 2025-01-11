import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./productcard"; // Import ProductCard

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for the backend API
  const BASE_URL = "http://localhost:5000";

  // Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${BASE_URL}/api/products`); // Fetch products
        // Map products to include the full image URL
        const updatedProducts = response.data.map((product) => ({
          ...product,
          image: `${BASE_URL}/${product.image}`, // Append the base URL to the image path
        }));
        setProducts(updatedProducts); // Set updated products
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-600">Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="text-center p-10 pt-40">
      <h1 className="font-bold text-4xl mb-4">OUR FEATURED PRODUCTS</h1>
      <h2 className="text-3xl">Top Selling And New Arrivals</h2>

      <div className="w-fit mx-auto grid grid-cols-1  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-10 gap-x-14 mt-10 mb-5">
        {products.map((product) => (
          <ProductCard
            key={product._id} // Assuming API uses _id as the unique identifier
            id={product._id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice} // Ensure your API returns this field
            brand={product.brand} // Ensure your API returns this field
            image={product.image} // Full image URL
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
