import React from "react";
import { Outlet } from "react-router-dom";

import "../../assets/admin.css"; // Or your admin-specific CSS path
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const AdminPanel = () => {
  return (
    <div className="main-layout">
      <div className="sidebar-container">
        <Sidebar />
      </div>

      <main className="main-content">
        <Outlet /> {/* This will render nested routes like Dashboard, Products, etc */}
      </main>
    </div>

  );
};

export default AdminPanel;
