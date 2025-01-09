import React, { useState, useEffect } from 'react';
import ProductTable from '../Components/ProductTable';
import ProductModal from '../Modals/ProductModal';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../actions/productActions';
import { getCategories } from '../actions/categoryActions';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const fetchProductsAndCategories = async () => {
        setProducts(await getProducts());
        setCategories(await getCategories());
    };

    const handleSave = async (product) => {
        if (product._id) {
            await updateProduct(product._id, product);
        } else {
            await addProduct(product);
        }
        fetchProductsAndCategories();
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        fetchProductsAndCategories();
    };

    useEffect(() => {
        fetchProductsAndCategories();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <button onClick={() => { setCurrentProduct(null); setShowModal(true); }}>Add Product</button>
            <ProductTable
                products={products}
                onEdit={(product) => { setCurrentProduct(product); setShowModal(true); }}
                onDelete={handleDelete}
            />
            <ProductModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
                categories={categories}
                initialProduct={currentProduct}
            />
        </div>
    );
};

export default ProductPage;
