import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryTable from "../Components/CategoryTable";
import CategoryModal from "../Modals/CategoryModal";
import DeleteModal from "../Modals/DeleteModal";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null); // For delete modal
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5); // Items per page

  // Fetch categories from the backend
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle saving (adding or editing a category)
  const handleSave = async () => {
    try {
      await fetchCategories();
      setShowModal(false);
      toast.success(
        currentCategory
          ? "Category updated successfully!"
          : "Category added successfully!"
      );
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Error saving category. Please try again.");
    }
  };

  // Handle delete button click to open the delete confirmation modal
  const handleDelete = (category) => {
    setDeleteCategory(category);
  };

  // Confirm deletion of a category
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/categories/${deleteCategory._id}`
      );
      fetchCategories();
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category. Please try again.");
    }
    setDeleteCategory(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Pagination Logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Categories
        </h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setCurrentCategory(null);
              setShowModal(true);
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            + Add Category
          </button>
        </div>
        <div className="">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin border-t-4 border-blue-500 border-4 rounded-full w-12 h-12"></div>
            </div>
          ) : (
            <CategoryTable
              categories={currentCategories}
              onEdit={(category) => {
                setCurrentCategory(category);
                setShowModal(true);
              }}
              onDelete={handleDelete} // Open delete modal
              currentPage={currentPage}
              categoriesPerPage={categoriesPerPage}
              totalCategories={categories.length}
              paginate={paginate}
            />
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteCategory && (
          <DeleteModal
            entityName={deleteCategory.name}
            onClose={() => setDeleteCategory(null)}
            onConfirm={confirmDelete}
          />
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
