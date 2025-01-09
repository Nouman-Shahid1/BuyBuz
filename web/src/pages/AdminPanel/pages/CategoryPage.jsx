import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryTable from '../Components/CategoryTable';
import CategoryModal from '../Modals/CategoryModal';
import { toast } from 'react-toastify'; // Assuming you have react-toastify for notifications

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingCategoryId, setDeletingCategoryId] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Error fetching categories. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await fetchCategories(); // Refresh categories after saving
            setShowModal(false);
            toast.success(currentCategory ? 'Category updated successfully!' : 'Category added successfully!');
        } catch (error) {
            console.error('Error saving category:', error);
            toast.error('Error saving category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setDeletingCategoryId(id);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/categories/${deletingCategoryId}`);
            fetchCategories(); // Refresh categories after deleting
            toast.success('Category deleted successfully!');
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Error deleting category. Please try again.');
        }
        setDeletingCategoryId(null);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Categories</h1>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => { setCurrentCategory(null); setShowModal(true); }}
                        className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
                    >
                        + Add Category
                    </button>
                </div>
                <div className="bg-white shadow rounded p-6">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
                        </div>
                    ) : (
                        <CategoryTable
                            categories={categories}
                            onEdit={(category) => { setCurrentCategory(category); setShowModal(true); }}
                            onDelete={handleDelete}
                        />
                    )}
                </div>

                {/* Confirm Delete Modal */}
                {deletingCategoryId && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h2 className="text-xl font-bold">Confirm Deletion</h2>
                            <p>Are you sure you want to delete this category?</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => setDeletingCategoryId(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Category Modal */}
                <CategoryModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    initialCategory={currentCategory}
                />
            </div>
        </div>
    );
};

export default CategoryPage;
