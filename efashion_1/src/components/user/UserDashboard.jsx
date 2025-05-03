import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("id");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/product/getAllProduct");
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`/wishlist/getWishlistByUserId/${userId}`);
                const wishlistItems = response.data.data.map(item => item.productId._id); // Extract product IDs
                setWishlist(wishlistItems);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };


        if (userId) {
            fetchProducts();
            fetchWishlist();
        }
    }, [userId]);

    const addToCart = async (productId) => {
        try {
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


    const toggleWishlist = async (productId) => {
        try {
            if (wishlist.includes(productId)) {
                // Remove from wishlist
                await axios.delete(`/wishlist/removeWishlistByUserId/${userId}/${productId}`);
                setWishlist(wishlist.filter(id => id !== productId));
            } else {
                // Add to wishlist (Send data in request body)
                const response = await axios.post("/wishlist/addWishlistByUserId", {
                    userId,
                    productId
                });
                console.log("Added to wishlist:", response.data.data);
                setWishlist([...wishlist, productId]);
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };



    const handleImageClick = (productId) => {
        navigate(`/user/product-details/${productId}`);
    };

    return (
        <div className="user-dashboard">
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => {
                        const isLiked = wishlist.includes(product._id);

                        return (
                            <div key={product._id} className="product-card">
                                <div className="product-images">
                                    <img
                                        src={product.productImageUrl1}
                                        alt="Product"
                                        className="product-image"
                                        onClick={() => handleImageClick(product._id)}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                                <h2 className="product-name">{product.productName}</h2>
                                <p className="product-price">
                                    <span className="base-price">₹{product.basePrice}</span>
                                    <span className="offer-price">₹{product.offerPrice}</span>
                                </p>
                                <div className="buttons">
                                    <button
                                        className="buy-button"
                                        onClick={() => addToCart(product._id)}
                                    >
                                        Add to Cart
                                    </button>

                                    <button
                                        className="wishlist-button"
                                        onClick={() => toggleWishlist(product._id)}
                                    >
                                        {isLiked ? "❤️" : "🤍"}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
