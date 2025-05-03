import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    

    const addToCart = async (productId) => {
        try {
            const userId = localStorage.getItem("id");
            const response = await axios.post("/cart/addtocart", {
                userId,
                productId,
                quantity: 1
            });
            console.log("Added to cart:", response.data);
            // Optionally, show a toast or alert
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const getProductDetails = async () => {
        try {
            const res = await axios.get(`product/getProductById/${id}`);
            console.log("Product Details:", res.data);
            setProduct(res.data.data);
        } catch (error) {
            console.error("Error fetching product details:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, []);

    if (!product) {
        return <p className="loading">Loading product details...</p>;
    }

    return (
        <div className="product-details" style={{ marginTop: "100px" }}>
            <h2>{product.productName}</h2>
            <div className="product-images">
                <img src={product.productImageUrl1} alt="Product 1" />
                <img src={product.productImageUrl2} alt="Product 2" />
                <img src={product.productImageUrl3} alt="Product 3" />
            </div>
            <p><strong>Category:</strong> {product.categoryId.name}</p>
            <p><strong>Price:</strong> ₹{product.basePrice}</p>
            <p><strong>Description:</strong> {product.productDetails}</p>
            <div>
                <button
                    className="buy-button"
                    onClick={() => addToCart(product._id)}
                >
                    Add to Cart
                </button>
            </div>
            <Link to="/user/userdashboard" className="back-btn">Back to Products</Link>
        </div>
    );
};

export default ProductDetails;
