import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            {products.length === 0 ? (
                <div className="text-center py-6 text-gray-600">
                    <p>No products available.</p>
                </div>
            ) : (
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                           
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                {/* Image Column */}
                               
                                {/* Name Column */}
                                <td className="px-6 py-4 text-sm text-gray-700">{product.name}</td>
                                {/* Description Column */}
                                <td className="px-6 py-4 text-sm text-gray-700">{product.description}</td>
                                {/* Category Column */}
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {product.category?.name || 'Uncategorized'}
                                </td>
                                {/* Price Column */}
                                <td className="px-6 py-4 text-sm text-gray-700">${product.price.toFixed(2)}</td>
                                {/* Actions Column */}
                                <td className="px-6 py-4 text-center flex justify-center gap-4">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="text-blue-500 hover:text-blue-700 transition"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => onDelete(product._id)}
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

export default ProductTable;
