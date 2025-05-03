import { React, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"

import { Route, Routes, useLocation } from 'react-router-dom'


import ProductForm from './components/seller/ProductForm'
import Signup from './components/common/Signup'
import Login from './components/common/Login'
import axios from 'axios'
import PrivateRoutes from './hooks/PrivateRoutes'
import SellerSidebar from './components/layouts/SellerSidebar'
import LandingPage from './components/common/LandingPage'

import SellerProductDetails from './components/seller/SellerProductDetails'
import ProductList from './components/seller/ProductList'
import SellerDashboard from './components/seller/SellerDashboard'
import OrderList from './components/seller/OrderList'
import UserDashboard from './components/user/UserDashboard'
import UserCart from './components/user/UserCart'
import PaymentPage from './components/user/PaymentPage'
import Order from './components/user/Order'
import UserProfileDetails from './components/user/UserProfileDetails'
import Categories from './components/user/Categories'
import UserNavbar from './components/layouts/UserNavbar'
import Wishlist from './components/user/Wishlist'
import ProductDetails from './components/user/ProductDetails'


import UserProfile from './components/user/UserProfile'
import AdminPanel from './components/admin/AdminPanel'
import Home from './components/admin/Home'
import Customers from './components/admin/Customers'
import Seller from './components/admin/Seller'
import ProductInfo from './components/admin/ProductInfo'
import UpdateProduct from './components/seller/UpdateProduct'
import SellerProfile from './components/seller/SellerProfile'
import SellerAddress from './components/seller/SellerAddress'
import UpdateProductAdmin from './components/admin/UpdateProductAdmin'
import UpdateProfile from './components/admin/UpdateProfile'







//import './App.css'

function App() {
  axios.defaults.baseURL = "http://localhost:3000"
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"}>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<PaymentPage />} />

        <Route path="/admin" element={<AdminPanel />}>
        <Route path="dashboardd" element={<Home />} />
        <Route path="customers/:roleId" element={<Customers />} />
        <Route path="seller/:roleId" element={<Seller />} />
        <Route path="products" element={<ProductInfo />} />
        <Route path="update-product/:id" element={<UpdateProductAdmin />} />
        <Route path="update-user/:userId" element={<UpdateProfile />} />
      </Route>
      
      
        <Route path="" element={<PrivateRoutes />}>

          <Route path="/user" element={<UserNavbar />} >
            <Route path="userdashboard" element={<UserDashboard />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="userorder" element={<Order />} />
            <Route path="usercart" element={<UserCart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="profile" element={<UserProfileDetails />} >
            </Route>
              <Route path="address" element={<UserProfile />} />
          </Route>
          
          <Route path="/seller" element={<SellerSidebar />} >
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="productlist" element={<ProductList />} />
            <Route path="product/:id" element={<SellerProductDetails />} />
            <Route path="product" element={<ProductForm />} />
            <Route path="order" element={<OrderList />} />
            <Route path="update/:id" element={<UpdateProduct />} />
            <Route path="profiles" element={<SellerProfile />} />
            <Route path="addresses" element={<SellerAddress />} />
          </Route>

        </Route>
      </Routes>
    </div>

  )
}

export default App
