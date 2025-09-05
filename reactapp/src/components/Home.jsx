import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import Navbar1 from './NavBar1';

export default function Home() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isLoggedIn = !!token; 

  return (
    <>
      {/* Show different navbar depending on role */}
      {isLoggedIn && role === "ADMIN" && <Navbar />}
      {isLoggedIn && role !== "ADMIN" && <Navbar1 />}

      <div
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(to right, #d4fc79, #96e6a1)",
        }}
      >
        <h1 className="fs-1 fw-bolder mb-3" style={{ color: "#2c3e50" }}>
          Welcome to the Health Coach Application
        </h1>

        <p className="lead mb-4" style={{ color: "#555" }}>
          Join our community of skilled health coaches and help individuals
          improve their health and wellness!
        </p>

        <div className="text-center d-flex gap-3 justify-content-center align-items-center">
          {/* Not logged in → show login/register */}
          {!isLoggedIn && (
            <>
              <Link to="/login" className="btn btn-success btn-lg px-4 py-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-success btn-lg px-4 py-2">
                Register
              </Link>
            </>
          )}

          {/* Logged in as Admin */}
          {isLoggedIn && role === "ADMIN" && (
            <>
              <Link to="/apply" className="btn btn-success btn-lg px-4 py-2">
                Become a Health Coach
              </Link>
              <Link to="/register" className="btn btn-success btn-lg px-4 py-2">
                Add Member
              </Link>
            </>
          )}

          {/* Logged in as Client/Coach */}
          {isLoggedIn && role !== "ADMIN" && (
            <>
              <Link
                to="/coachRequestForm"
                className="btn btn-success btn-lg px-4 py-2"
              >
                Become a Health Coach
              </Link>
              <Link
                to="/clientRequestForm"
                className="btn btn-success btn-lg px-4 py-2"
              >
                Become a Member
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
