import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryModal = ({ show, onClose, onSave, initialCategory }) => {
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (show) {
      setCategory(initialCategory || {});
    }
  }, [show, initialCategory]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category._id) {
        await axios.put(
          `http://localhost:5000/api/categories/${category._id}`,
          category
        );
      } else {
        await axios.post("http://localhost:5000/api/categories", category);
      }
      onSave(); // Trigger refresh in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          {category._id ? "Edit Category" : "Add Category"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={category.name || ""}
              onChange={handleChange}
              placeholder="Enter category name"
              required
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-sm font-medium rounded hover:bg-gray-300 transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
