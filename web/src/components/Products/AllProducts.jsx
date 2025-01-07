import React from "react";
import ProductCard from "./productcard"; // Import ProductCard

// Product Images
import productSeven from "../../assets/ProductSeven.jpeg";
import ProductEight from "../../assets/ProductEight.jpeg";
import ProductNine from "../../assets/ProductNine.jpeg";
import ProductTen from "../../assets/ProductTen.jpeg";
import ProductEleven from "../../assets/ProductEleven.jpeg";

// Example product data
const products = [
  {
    id: 1,
    name: "Floral Print Shirt",
    price: 80,
    originalPrice: 100,
    brand: "Gucci",
    image: productSeven,
  },
  {
    id: 2,
    name: "Kids Track Suit",
    price: 90,
    originalPrice: 99,
    brand: "Adidas",
    image: ProductEight,
  },
  {
    id: 3,
    name: "Boys Sweat Shirt",
    price: 59,
    originalPrice: 99,
    brand: "Zara",
    image: ProductNine,
  },
  {
    id: 4,
    name: "Ladies Sneakers",
    price: 120,
    originalPrice: 199,
    brand: "Nike",
    image: ProductTen,
  },
  {
    id: 5,
    name: "Mens Sneakers",
    price: 78,
    originalPrice: 99,
    brand: "Jordan",
    image: ProductEleven,
  },
];

const AllProducts = () => {
  return (
    <div className="text-center p-10 pt-40">
      <h1 className="font-bold text-4xl mb-4">OUR FEATURED PRODUCTS</h1>
      <h2 className="text-3xl">Top Selling And New Arrivals</h2>

      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-10 gap-x-14 mt-10 mb-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            brand={product.brand}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
