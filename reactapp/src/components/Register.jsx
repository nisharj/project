import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "CLIENT",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Registration failed");

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: "linear-gradient(to right, #d4fc79, #96e6a1)" }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{ width: "400px", borderRadius: "20px" }}
      >
        <h2 className="text-center mb-4 text-success fw-bold">
          Register New User
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="CLIENT">Client</option>
              <option value="COACH">Coach</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold mb-3"
            style={{ borderRadius: "10px" }}
          >
            Register
          </button>
        </form>

        <div className="text-center">
          <Link to="/login" className="btn btn-outline-secondary w-100">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
