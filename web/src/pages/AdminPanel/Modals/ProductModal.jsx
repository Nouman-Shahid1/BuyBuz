import React, { useState, useEffect } from 'react';

const ProductModal = ({ show, onClose, onSave, categories, initialProduct }) => {
    const [product, setProduct] = useState(initialProduct || {});

    useEffect(() => {
        setProduct(initialProduct || {});
    }, [initialProduct]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{product._id ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={product.name || ''}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <textarea
                        name="description"
                        value={product.description || ''}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                    <select
                        name="category"
                        value={product.category || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="price"
                        value={product.price || ''}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />
                    <button type="submit">Save</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ProductModal;
