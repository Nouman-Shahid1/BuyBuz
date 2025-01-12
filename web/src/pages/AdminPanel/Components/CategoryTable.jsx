import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
  currentPage,
  categoriesPerPage,
  totalCategories,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCategories / categoriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg ">
      {categories.length === 0 ? (
        <div className="text-center py-6 text-gray-600">
          <p>No categories found.</p>
        </div>
      ) : (
        <>
          {/* Table View */}
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category, index) => (
                <tr
                  key={category._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:shadow-md transition`}
                >
                  {/* Numbering Column */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {((currentPage || 1) - 1) * (categoriesPerPage || 1) +
                      index +
                      1}
                  </td>
                  {/* Name Column */}
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                    {category.name}
                  </td>
                  {/* Actions Column */}
                  <td className="px-6 py-4 text-center flex justify-center gap-4">
                    <button
                      onClick={() => onEdit(category)}
                      className="text-blue-500 hover:text-blue-700 transition flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(category)}
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
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-purple-600 transition`}
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

export default CategoryTable;
