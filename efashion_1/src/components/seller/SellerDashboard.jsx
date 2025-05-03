import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler);

import "../../assets/SellerDashboard.css";

const SellerDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productRes, orderRes] = await Promise.all([
          axios.get(`/product/countproducts/${userId}`),
          axios.get(`/order/countorders/${userId}`), // adjust route if different
        ]);

        setTotalProducts(productRes.data.total || 0);
        setTotalOrders(orderRes.data.total || 0);
      } catch (err) {
        console.error("Failed to fetch dashboard counts:", err.message);
      }
    };

    fetchCounts();
  }, [userId]);

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Orders",
        data: [30, 45, 60, 50, 70, 90],
        backgroundColor: "#4CAF50",
        borderRadius: 5,
      },
    ],
  };

  const earningsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Earnings (₹)",
        data: [1000, 1500, 3000, 2500, 4000, 5300],
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Seller Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="card-title">Total Products</h2>
          <p className="card-value">{totalProducts}</p>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Total Orders</h2>
          <p className="card-value">{totalOrders}</p>
          <div className="mini-chart">
            <Bar data={ordersData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Earnings</h2>
          <p className="card-value">₹5,300</p>
          <div className="mini-chart">
            <Line data={earningsData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
