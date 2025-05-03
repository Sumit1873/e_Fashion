import React, { useEffect, useState } from "react";
import "../../assets/Wishlist.css"
import axios from "axios";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const userId = localStorage.getItem("id"); // Get user ID from localStorage

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`/wishlist/getWishlistByUserId/${userId}`);
            console.log(response.data.data);
            setWishlist(response.data.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await axios.delete(`/wishlist/removeWishlistByUserId/${userId}/${productId}`);
            setWishlist(wishlist.filter(item => item.productId._id !== productId));
            alert("Product removed from wishlist!");
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    return (
        <div className="wishlist-container">
            <h2>Your Wishlist</h2>
            {wishlist.length > 0 ? (
                <div className="wishlist-horizontal-scroll">
                    {wishlist.map((item) => (
                        <div key={item._id} className="wishlist-card">
                            <img src={item.productId.productImageUrl1} alt={item.productId.productName} />
                            <h3>{item.productId.productName}</h3>
                            <p>Price: ₹{item.productId.offerPrice}</p>
                            <button onClick={() => removeFromWishlist(item.productId._id)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
