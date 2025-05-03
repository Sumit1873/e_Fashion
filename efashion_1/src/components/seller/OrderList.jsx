import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const Id = localStorage.getItem("id"); // Assuming seller ID is stored in localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/order/getOrders`);
        console.log(response.data.data);
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (Id) {
      fetchOrders();
    }
  }, [Id]);

  // Function to handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`/order/updateStatus/${orderId}`, { status: newStatus });
      console.log("Order updated:", response.data);

      // Update the state after successful update
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}
                style={{
                  backgroundColor:
                    order.status.toLowerCase() === "cancel"
                      ? "#f8d7da"
                      : order.status.toLowerCase() === "delivered"
                        ? "#d4edda"
                        : "#fff",

                }}
              >
                <td>{order._id}</td>
                <td>{order.userId?.firstName || "Unknown"}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancel">Cancel</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
