import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid d-flex flex-column align-items-center">
          
          {/* Centering Navigation Links */}
          <div className="d-flex justify-content-center w-100 ">
            <ul className="navbar-nav d-flex flex-row gap-4">
              <li className="nav-item">
                <Link to="userdashboard" className="nav-link text-center">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="categories" className="nav-link text-center">Categories</Link>
              </li>
              <li className="nav-item">
                <Link to="userorder" className="nav-link text-center">Orders</Link>
              </li>
              <li className="nav-item">
                <Link to="usercart" className="nav-link text-center">Cart</Link>
              </li>
              <li className="nav-item">
                <Link to="wishlist" className="nav-link text-center">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link to="profile" className="nav-link text-center">User Profile</Link>
              </li>
              {/* <li className="nav-item">
                <Link to="profile" className="nav-link text-center">Search</Link>
              </li> */}
            </ul>
            
          </div>

          {/* Centering Logout Button */}
          <div style={{ marginTop: -60, marginLeft: 1400 }}>

            <button className="btn back-btn" onClick={handleLogout}>LOGOUT</button>
          </div>

          

        </div>
      </nav>
      <main className='app-main'>
        <Outlet />
      </main>
    </>
  );
};

export default UserNavbar;
