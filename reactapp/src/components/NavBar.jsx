import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2c3e50' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="text-white fs-4 fw-bold">Health Coach Application</h1>
        
        <ul className="navbar-nav flex-row gap-3">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/getAllCoaches">Health Coach Details</Link>
          </li>
          <li>
            <Link className='nav-link text-white' to="/getAllClients">Clients</Link>
          </li>
          <li>
            <Link className='nav-link text-white' to="/notifications">Requests</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
