import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllMyProducts = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const res = await axios.get(`/product/getAllProductByUserId/${userId}`);
      if (res.data && res.data.data) {
        setProducts(res.data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this product?");
      if (!confirm) return;

      await axios.delete(`/product/delete/${id}`);
      getAllMyProducts(); // Refresh list
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllMyProducts();
  }, []);

  return (
    <div className="seller-home">
      <h2 className="title">My Products</h2>
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <h3 className="product-name">{product.productName}</h3>
              <div className="product-images">
                <img src={product?.productImageUrl1} alt="Product 1" />
                <img src={product?.productImageUrl2} alt="Product 2" />
                <img src={product?.productImageUrl3} alt="Product 3" />
              </div>
              <Link to={`/seller/product/${product._id}`} className="view-btn">View</Link>
              <button className="update-btn" onClick={() => navigate(`/seller/update/${product._id}`)}>Update</button>
              <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
