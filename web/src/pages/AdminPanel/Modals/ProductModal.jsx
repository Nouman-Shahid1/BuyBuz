import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductModal = ({ show, onClose, onSave, categories, initialProduct }) => {
    const [product, setProduct] = useState(initialProduct || {});
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        setProduct(initialProduct || {});
        setImagePreview(initialProduct?.image || null);
        setImageFile(null); // Reset image file on modal open
    }, [initialProduct]);

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
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('category', product.category);
        formData.append('price', product.price);
        if (imageFile) {
            formData.append('image', imageFile); // Append image if uploaded
        }

        if (product._id) {
            // Update product API
            await axios.put(`http://localhost:5000/api/products/${product._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } else {
            // Create product API
            await axios.post('http://localhost:5000/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        }

        onSave(); // Refresh the product list
        onClose(); // Close the modal
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {product._id ? 'Edit Product' : 'Add Product'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={product.name || ''}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 shadow-inner transition hover:bg-gray-200 active:bg-gray-300"
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={product.description || ''}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            required
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 shadow-inner transition hover:bg-gray-200 active:bg-gray-300"
                        />
                    </div>

                    {/* Category Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={product.category || ''}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 shadow-inner transition hover:bg-gray-200 active:bg-gray-300"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price || ''}
                            onChange={handleChange}
                            placeholder="Enter product price"
                            required
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 shadow-inner transition hover:bg-gray-200 active:bg-gray-300"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 shadow-inner transition hover:bg-gray-200 active:bg-gray-300"
                        />
                        {imagePreview && (
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={imagePreview}
                                    alt="Product Preview"
                                    className="h-32 w-32 object-cover rounded-lg border border-gray-300 shadow-md"
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 active:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:bg-blue-700"
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
