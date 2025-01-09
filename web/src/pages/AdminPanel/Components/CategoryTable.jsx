import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            {categories.length === 0 ? (
                <div className="text-center py-6 text-gray-600">
                    <p>No categories found.</p>
                </div>
            ) : (
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-800">{category.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 flex gap-4">
                                    <button
                                        onClick={() => onEdit(category)}
                                        className="text-blue-500 hover:text-blue-700 transition"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => onDelete(category._id)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CategoryTable;
