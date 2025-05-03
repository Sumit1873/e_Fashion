import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";


import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const SellerNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Assuming the user's name is stored in localStorage after login
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      {/*begin::Container*/}
      <div className="container-fluid">
        <ul className="navbar-nav" style={{ marginLeft: "220px" }}>
          <li className="nav-item">
            <a
              className="nav-link btn btn-light"
              href="#"
              role="button"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={toggleSidebar}
            >
              <FaBars size={25} />
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto d-flex align-items-center">
          {/* User Profile Icon and Name */}
          <li className="nav-item d-flex flex-column align-items-center me-3">
            <FaUserCircle size={30} />
            <span style={{ fontSize: "12px", marginTop: "5px" }}>{userName || "User"}</span>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <i className="bi bi-search" />
            </a>
          </li>

          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>LOGOUT</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SellerNavbar;
