import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryModal = ({ show, onClose, onSave, initialCategory }) => {
    const [category, setCategory] = useState(initialCategory || {});

    useEffect(() => {
        setCategory(initialCategory || {});
    }, [initialCategory]);

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (category._id) {
                // Update category (PUT request)
                await axios.put(`http://localhost:5000/api/categories/${category._id}`, category);
            } else {
                // Create category (POST request)
                await axios.post('http://localhost:5000/api/categories', category);
            }
            onSave(); // Trigger refresh in the parent component
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-1/3 p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{category._id ? 'Edit Category' : 'Add Category'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={category.name || ''}
                            onChange={handleChange}
                            placeholder="Enter category name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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