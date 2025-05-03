import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/style.css";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log(res.data);

      if (res.status === 200) {
        alert("Login successful!");
        localStorage.setItem("id", res.data.data._id);

        const role = res.data.data.roleId.name;
        if (role === "Customer") navigate("/user/userdashboard");
        else if (role === "Seller") navigate("/seller/dashboard");
        else if (role === "Admin") navigate("/admin/dashboardd");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please check your credentials and try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="form-control rounded-3"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              {...register("password")}
              className="form-control rounded-3"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-grid mb-3">
            <button type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          <Link to="/forgot-password" className="d-block text-decoration-none text-secondary mb-2">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-decoration-none">
            Don't have an account? <strong>Sign up</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
