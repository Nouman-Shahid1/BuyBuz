import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductTable from "../Components/ProductTable";
import ProductModal from "../Modals/ProductModal";
import DeleteModal from "../Modals/DeleteModal";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const fetchProductsAndCategories = async () => {
    try {
      const productResponse = await axios.get(
        "http://localhost:5000/api/products"
      );
      const categoryResponse = await axios.get(
        "http://localhost:5000/api/categories"
      );
      setProducts(productResponse.data);
      setCategories(categoryResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    await fetchProductsAndCategories();
    setShowModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteProduct) {
      try {
        await axios.delete(
          `http://localhost:5000/api/products/${deleteProduct._id}`
        );
        await fetchProductsAndCategories();
        setShowDeleteModal(false);
        setDeleteProduct(null);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Product Management
        </h1>
        <p className="text-lg text-gray-600">
          Manage your inventory and keep your products up-to-date.
        </p>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setCurrentProduct(null);
            setShowModal(true);
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 hover:shadow-lg transition"
        >
          + Add Product
        </button>
      </div>

      {/* Product Table */}
      <ProductTable
        products={currentProducts}
        onEdit={(product) => {
          setCurrentProduct(product);
          setShowModal(true);
        }}
        onDelete={(product) => {
          setDeleteProduct(product);
          setShowDeleteModal(true);
        }}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />

      {/* Product Modal */}
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        categories={categories}
        initialProduct={currentProduct}
      />

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          entityName={deleteProduct.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ProductPage;
