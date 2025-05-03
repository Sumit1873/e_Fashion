import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [showAddressBox, setShowAddressBox] = useState(false);
    const navigate = useNavigate();


    const userId = localStorage.getItem("id");

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`/cart/getCartByUserId/${userId}`);
               // console.log(response.data.data);    
                setCartItems(response.data.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        fetchCartItems();
    }, [userId]);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.productId.offerPrice * item.quantity), 0);
        setTotalAmount(total);
    }, [cartItems]);

    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete(`/cart/removeProductFromCart/${productId}?userId=${userId}`);
            setCartItems(cartItems.filter((item) => item.productId._id !== productId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        try {
            await axios.put(`/cart/updateQuantity/${userId}/${productId}`, {
                quantity: newQuantity
            });
            setCartItems(cartItems.map((item) =>
                item.productId._id === productId ? { ...item, quantity: newQuantity } : item
            ));
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleBuyNow = async () => {
        try {
            const response = await axios.get(`/address/getaddress/${userId}`);
            //console.log(response.data.data);
            setAddresses(response.data.data);
            setShowAddressBox(true);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    const proceedToPayment = (selectedAddress) => {
        localStorage.setItem("totalAmount", totalAmount);
        localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
        navigate("/payment");
    };

    const handleAddAddress = () => {
        navigate("/user/address"); // You can change this route as per your project
    };

    return (
        <div className="cart-container" style={{ marginTop: "100px" }}>
            <h1 className="cart-title">Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.productId._id}>
                                    <td><img src={item.productId.productImageUrl1} alt="Product" className="cart-image" /></td>
                                    <td>{item.productId.productName}</td>
                                    <td>₹{item.productId.offerPrice}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>₹{item.productId.offerPrice * item.quantity}</td>
                                    <td>
                                        <button className="remove-btn" onClick={() => handleRemoveFromCart(item.productId._id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>Total Amount:</td>
                                <td style={{ fontWeight: "bold" }}>₹{totalAmount}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>

                    <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}

            {/* Address Modal */}
            {showAddressBox && (
                <div className="address-modal" style={{marginTop: "100px"}}>
                    <div className="address-box">
                        <h2>Select Delivery Address</h2>
                        {addresses.length > 0 ? (
                            addresses.map((address) => (
                                <div key={address._id} className="address-card">
                                    <p>{address.title},{address.unitName}, {address.street}</p>
                                    <p>{address.areaId.name}, {address.cityId.name},{address.stateId.name} - {address.pincode}</p>
                                    <button onClick={() => proceedToPayment(address)} className="select-btn">
                                        Deliver Here
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No address found. Please add one.</p>
                        )}
                        <button onClick={handleAddAddress} className="add-address-btn">Add New Address</button>
                        <button onClick={() => setShowAddressBox(false)} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCart;
