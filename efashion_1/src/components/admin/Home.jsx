import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Home = () => {
    const [userCounts, setUserCounts] = useState({ customer: 0, seller: 0 });

    const navigate = useNavigate();

    const customerRoleId = "67c52eb52248c3ccf76b0e46"; // Update with your actual role ID
    const sellerRoleId = "67c6bab8eea5670f01c90fd1";  // Update with your actual role ID

    const [monthlySignups, setMonthlySignups] = useState([]);
    const [monthlyLogins, setMonthlyLogins] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);



    useEffect(() => {
        const fetchSignupLoginData = async () => {
            try {
                const [signupRes, loginRes] = await Promise.all([
                    axios.get("/user/monthly-signups"),
                    axios.get("/user/monthly-logins"),
                ]);

                // Convert to array of counts by month (1-12)
                const formatMonthlyData = (data) => {
                    const counts = Array(12).fill(0);
                    data.forEach(item => {
                        counts[item._id - 1] = item.count;
                    });
                    return counts;
                };

                setMonthlySignups(formatMonthlyData(signupRes.data.data));
                setMonthlyLogins(formatMonthlyData(loginRes.data.data));
            } catch (error) {
                console.error("Error fetching signup/login data:", error);
            }
        };

        fetchSignupLoginData();
    }, []);


    useEffect(() => {
        const fetchUserCounts = async () => {
            try {
                const response = await axios.get("/user/count-by-role");
                const result = response.data.data;
                console.log(result);

                const counts = { customer: 0, seller: 0 };

                result.forEach(role => {
                    const roleName = role.roleName.toLowerCase();
                    if (roleName === "customer") {
                        counts.customer = role.count;
                    } else if (roleName === "seller") {
                        counts.seller = role.count;
                    }
                });

                setUserCounts(counts);
            } catch (error) {
                console.error("Failed to fetch user counts:", error);
            }
        };

        fetchUserCounts();
    }, []);

    useEffect(() => {
        const fetchTotalProducts = async () => {
            try {
                const response = await axios.get("/product/totalProductCount");
                setTotalProducts(response.data.total);
            } catch (error) {
                console.error("Failed to fetch total products:", error);
            }
        };

        fetchTotalProducts();
    }, []);


    const revenueData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Revenue (₹)",
                data: [5000, 7000, 9000, 8500, 12000, 14000],
                backgroundColor: "#009688",
                borderRadius: 5,
            },
        ],
    };

    const productData = {
        labels: ["Total Products"],
        datasets: [
            {
                label: "Total Products",
                data: [totalProducts],
                backgroundColor: "#673ab7",
                borderRadius: 5,
            },
        ],
    };

    const usersData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Signups",
                data: monthlySignups,
                borderColor: "#3f51b5",
                backgroundColor: "rgba(63, 81, 181, 0.2)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "Logins",
                data: monthlyLogins,
                borderColor: "#ff9800",
                backgroundColor: "rgba(255, 152, 0, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };


    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Admin Dashboard</h1>

            <div className="dashboard-grid">
                {/* Total Customers */}
                <div className="dashboard-card" onClick={() => navigate(`/admin/customers/${customerRoleId}`)} style={{ cursor: "pointer" }}>
                    <h2 className="card-title">Total Customers</h2>
                    <p className="card-value">{userCounts.customer}</p>
                </div>

                {/* Total Sellers */}
                <div className="dashboard-card" onClick={() => navigate(`/admin/seller/${sellerRoleId}`)} style={{ cursor: "pointer" }}>
                    <h2 className="card-title" >Total Sellers</h2>
                    <p className="card-value">{userCounts.seller}</p>
                </div>

                {/* Monthly Signups Chart */}
                <div className="dashboard-card">
                    <h2 className="card-title">Monthly Signups</h2>
                    <div className="mini-chart">
                        <Line
                            data={{
                                labels: [
                                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                                ],
                                datasets: [
                                    {
                                        label: "Signups",
                                        data: monthlySignups,
                                        borderColor: "#3f51b5",
                                        backgroundColor: "rgba(63, 81, 181, 0.2)",
                                        fill: true,
                                        tension: 0.4,
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                            }}
                        />
                    </div>
                </div>

                {/* Monthly Logins Chart */}
                <div className="dashboard-card">
                    <h2 className="card-title">Monthly Logins</h2>
                    <div className="mini-chart">
                        <Line
                            data={{
                                labels: [
                                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                                ],
                                datasets: [
                                    {
                                        label: "Logins",
                                        data: monthlyLogins,
                                        borderColor: "#ff9800",
                                        backgroundColor: "rgba(255, 152, 0, 0.2)",
                                        fill: true,
                                        tension: 0.4,
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                            }}
                        />
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="dashboard-card">
                    <h2 className="card-title">Monthly Revenue</h2>
                    <div className="mini-chart">
                        <Bar
                            data={revenueData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                            }}
                        />
                    </div>
                </div>

                {/* Total Products Chart */}
                <div className="dashboard-card" onClick={() => navigate("/admin/products")}
                    style={{ cursor: "pointer" }}>
                    <h2 className="card-title">Total Products</h2>
                    <div className="mini-chart">
                        <Bar
                            data={productData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
