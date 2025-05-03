import React, { useState, useEffect } from "react";
import "../../assets/PaymentPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("id");
        const storedTotalAmount = localStorage.getItem("totalAmount");
        const address = localStorage.getItem("selectedAddress");

        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            alert("User not logged in! Redirecting to login.");
            navigate("/login");
        }

        if (storedTotalAmount) {
            setTotalAmount(parseFloat(storedTotalAmount));
        }

        if (address) {
            setSelectedAddress(JSON.parse(address));
        }
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`/cart/getCartByUserId/${userId}`);
                setCartItems(response.data.data);
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        fetchCartItems();
    }, [userId]);

    const formatCardNumber = (value) => value.replace(/\D/g, "").slice(0, 16).match(/.{1,4}/g)?.join(" ") || "";
    const formatExpiry = (value) => value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})/, "$1/");
    const formatCvv = (value) => value.replace(/\D/g, "").slice(0, 3);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("User ID missing! Please log in again.");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (!selectedAddress) {
            alert("No delivery address selected!");
            return;
        }

        try {
            const productIds = cartItems.map((item) => item.productId._id);

            const orderRes = await axios.post("/order/addOrder", {
                userId,
                productId: productIds,
                totalAmount,
                address: selectedAddress, // Save address in order
            });

            if (orderRes.status === 201) {
                const orderId = orderRes.data.data._id;

                await Promise.all(cartItems.map((item) =>
                    axios.post("/orderdetails/addOrderDetails", {
                        orderId,
                        productId: item.productId._id,
                        quantity: item.quantity,
                    })
                ));

                await axios.delete(`/cart/removeFromCart/${userId}`);

                alert("Payment Successful! Order Placed.");
                navigate("/user/userorder");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Payment failed. Try again.");
        }
    };

    return (
        <div className="payment-page">
            <div className="payment-container">
                <div className="payment-box">
                    <h2 className="payment-title">Payment Details</h2>
                    <p className="payment-subtitle">Total Amount: ₹{totalAmount.toFixed(2)}</p>

                    {/* Show Selected Address */}
                    {selectedAddress ? (
                        <div className="address-summary">
                            <h4>Delivering To:</h4>
                            <p>{selectedAddress.title},{selectedAddress.unitName}, {selectedAddress.street}</p>
                            <p>{selectedAddress.areaId.name}, {selectedAddress.cityId.name},{selectedAddress.stateId.name}, {selectedAddress.pincode}</p>
                        </div>
                    ) : (
                        <p style={{ color: "red" }}>No address selected!</p>
                    )}

                    <div className="card-preview float-animation">
                        <div className="card-number">{cardNumber || "•••• •••• •••• ••••"}</div>
                        <div className="card-details">
                            <div>
                                <span>Card Holder</span>
                                <div className="card-holder">{cardHolder || "YOUR NAME"}</div>
                            </div>
                            <div>
                                <span>Expires</span>
                                <div className="expiry">{expiry || "MM/YY"}</div>
                            </div>
                        </div>
                    </div>

                    <form className="payment-form" onSubmit={handlePayment}>
                        <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Card Holder Name"
                            required
                        />
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="Card Number"
                            maxLength="19"
                            required
                        />
                        <div className="form-row">
                            <input
                                type="text"
                                value={expiry}
                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                placeholder="MM/YY"
                                maxLength="5"
                                required
                            />
                            <input
                                type="password"
                                value={cvv}
                                onChange={(e) => setCvv(formatCvv(e.target.value))}
                                placeholder="CVV"
                                maxLength="3"
                                required
                            />
                        </div>
                        <button type="submit" className="pay-button">
                            Pay ₹{totalAmount.toFixed(2)}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
