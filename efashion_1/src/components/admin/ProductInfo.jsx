import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For update navigation
import "../../assets/admin.css";

const ProductInfo = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/product/getAllProduct");
            setProducts(response.data.data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`/product/delete/${id}`);
            alert("Product deleted successfully!");
            fetchProducts(); // Refresh the list
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    const handleUpdate = (id) => {
        navigate(`/admin/update-product/${id}`);
    };

    return (
        <div className="admin-product-container">
            <h1 className="admin-title">All Products</h1>

            {loading ? (
                <p>Loading products...</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <table className="admin-product-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Seller Name</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Base Price</th>
                            <th>Offer Price</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product.userId.firstName}</td>
                                <td>{product.productName}</td>
                                <td>{product.categoryId?.name || "N/A"}</td>
                                <td>{product.subcategoryId?.name || "N/A"}</td>
                                <td>₹{product.basePrice}</td>
                                <td>₹{product.offerPrice}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <img
                                        src={product.productImageUrl1}
                                        alt={product.productName}
                                        style={{ width: "60px", borderRadius: "6px" }}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdate(product._id)}
                                        className="admin-btn update"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="admin-btn delete"
                                    >
                                        Delete
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

export default ProductInfo;
