import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../assets/style.css";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/user/signup", data);
      alert("User created successfully");
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setMessage("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "100%", maxWidth: "500px", marginTop: "300px" }}>
        <h2 className="text-center mb-4">Create Account</h2>
        {message && (
          <div className="alert alert-danger text-center py-2" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" {...register("roleId", { required: "Please select a role" })}>
              <option value="">Select Role</option>
              <option value="67c52eb52248c3ccf76b0e46">Customer</option>
              <option value="67c6bab8eea5670f01c90fd1">Seller</option>
            </select>
            {errors.roleId && <small className="text-danger">{errors.roleId.message}</small>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" {...register("firstName", { required: "First name is required" })} />
              {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" {...register("lastName", { required: "Last name is required" })} />
              {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })} />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })} />
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select className="form-select" {...register("gender", { required: "Please select a gender" })}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <small className="text-danger">{errors.gender.message}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" {...register("dob", { required: "Date of birth is required" })} />
            {errors.dob && <small className="text-danger">{errors.dob.message}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })} />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })} />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
          </div>

          <div className="d-grid">
            <button type="submit"  disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          <div className="text-center mt-2">
            <Link to="/login" className="text-decoration-none">
              Already have an account? <strong>Login</strong>
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Signup;
