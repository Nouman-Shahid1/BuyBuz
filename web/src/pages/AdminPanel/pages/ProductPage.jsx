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

  const fetchProductsAndCategories = async () => {
    const productResponse = await axios.get("http://localhost:5000/api/products");
    const categoryResponse = await axios.get("http://localhost:5000/api/categories");
    setProducts(productResponse.data);
    setCategories(categoryResponse.data);
  };

  const handleSave = async () => {
    fetchProductsAndCategories();
    setShowModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteProduct) {
      await axios.delete(`http://localhost:5000/api/products/${deleteProduct._id}`);
      fetchProductsAndCategories();
      setShowDeleteModal(false);
      setDeleteProduct(null);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <button
        onClick={() => {
          setCurrentProduct(null);
          setShowModal(true);
        }}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mb-4"
      >
        Add Product
      </button>
      <ProductTable
        products={products}
        onEdit={(product) => {
          setCurrentProduct(product);
          setShowModal(true);
        }}
        onDelete={(product) => {
          setDeleteProduct(product);
          setShowDeleteModal(true);
        }}
      />
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        categories={categories}
        initialProduct={currentProduct}
      />
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
