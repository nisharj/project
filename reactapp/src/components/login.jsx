import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("admin"); // UI toggle
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg || "Invalid login");
      }

      const data = await res.json();

      // store JWT + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("✅ Login successful!");

      // Navigate based on role
      if (data.role === "ADMIN") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
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
          Health Coach Login
        </h2>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-3 border-0">
          <li className="nav-item flex-fill">
            <button
              className={`nav-link w-100 ${
                activeTab === "admin" ? "active bg-success text-white" : ""
              }`}
              onClick={() => setActiveTab("admin")}
              type="button"
            >
              Admin
            </button>
          </li>
          <li className="nav-item flex-fill">
            <button
              className={`nav-link w-100 ${
                activeTab === "client" ? "active bg-success text-white" : ""
              }`}
              onClick={() => setActiveTab("client")}
              type="button"
            >
              Client / Coach
            </button>
          </li>
        </ul>

        {/* Login Form */}
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

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold mb-3"
            style={{ borderRadius: "10px" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : `Login as ${activeTab === "admin" ? "Admin" : "Client / Coach"}`}
          </button>
        </form>

        <div className="text-center">
          <Link to="/" className="btn btn-outline-secondary w-100">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
