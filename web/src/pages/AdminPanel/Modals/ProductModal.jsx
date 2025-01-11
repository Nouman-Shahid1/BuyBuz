import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductModal = ({ show, onClose, onSave, categories, initialProduct }) => {
  const [product, setProduct] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (show) {
      // Reset fields when the modal is opened
      setProduct(initialProduct || {});
      setImagePreview(initialProduct?.image || null);
      setImageFile(null);
    }
  }, [show, initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (product._id) {
      await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    onSave();
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md w-96 p-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          {product._id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              value={product.name || ""}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Description Input */}
          <div>
            <textarea
              name="description"
              value={product.description || ""}
              onChange={handleChange}
              placeholder="Product Description"
              required
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Category Input */}
          <div>
            <select
              name="category"
              value={product.category || ""}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Input */}
          <div>
            <input
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-200 text-sm font-medium rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
