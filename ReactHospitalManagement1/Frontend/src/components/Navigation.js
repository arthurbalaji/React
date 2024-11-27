import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Navigation({ onLogout }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointment-management">Appointment Management</Link></li>
        <li><Link to="/patient-management">Patient Management</Link></li>
        <li><Link to="/staff-management">Staff Management</Link></li>
        <li><Link to="/supply-management">Supply Management</Link></li>
        <li><button onClick={onLogout} className="logout-button">Logout</button></li> 
      </ul>
    </nav>
  );
}

export default Navigation;
