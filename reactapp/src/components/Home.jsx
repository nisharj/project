import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh', backgroundColor: '#f5f7fa' }}>
      <h1 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
        Welcome to the Health Coach Application
      </h1>
      <p className="lead mb-4" style={{ color: '#555' }}>
        Join our community of skilled health coaches and help individuals improve their health and wellness!
      </p>
      <Link to="/apply" className="btn btn-success btn-lg px-4 py-2">Become a Health Coach</Link>
    </div>
  );
}
