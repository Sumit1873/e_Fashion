import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { Button } from "@mui/material";

const Sidebar = () => {

  const navigation = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigation("/login");
  };
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-logo">eFashion Admin</h2>
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/admin/dashboardd"><FaTachometerAlt /> Dashboard</Link></li>
          <li><Link to="/admin/products"><FaBoxOpen /> Products</Link></li>
          <li><Link to="/admin/customers/67c52eb52248c3ccf76b0e46"><FaUsers /> Customers</Link></li>
          <li><Link to="/admin/seller/67c6bab8eea5670f01c90fd1"><FaUsers /> Sellers</Link></li>
          <li><button onClick={handleLogout}><FaSignOutAlt /> Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
