import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SellerProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);

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
            <p><strong>OfferPercentage:</strong> {product.offerPercentage}</p>
            <p><strong>Description:</strong> {product.productDetails}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <Link to="/seller/productlist" className="back-btn">Back to Products</Link>
        </div>
    );
};

export default SellerProductDetails;
