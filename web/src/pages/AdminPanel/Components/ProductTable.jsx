import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductTable = ({
  products,
  onEdit,
  onDelete,
  currentPage,
  productsPerPage,
  totalProducts,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
      {products.length === 0 ? (
        <div className="text-center py-6 text-gray-600">
          <p>No products available.</p>
        </div>
      ) : (
        <>
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:shadow-md transition`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {(currentPage - 1) * productsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={
                       `http://localhost:5000/${product.image}`
                      }
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.category?.name || "Uncategorized"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-4">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-500 hover:text-blue-700 transition flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="text-red-500 hover:text-red-700 transition flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center my-4">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-blue-600 transition`}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductTable;
