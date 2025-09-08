import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark p-3" style={{ backgroundColor: '#2c3e50' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="text-white fs-4 fw-bold">Health Coach Application</h1>
        
        <ul className="navbar-nav flex-row gap-3">
          <li className='nav-item'>
            <Link className='nav-link text-white' to='/'>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/coachRequestForm">Coach</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/clientRequestForm">Client</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link text-white' to='/login'>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
