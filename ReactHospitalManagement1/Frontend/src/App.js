import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AppointmentManagement from './components/AppointmentManagement';
import PatientManagement from './components/PatientManagement';
import StaffManagement from './components/StaffManagement';
import SupplyManagement from './components/SupplyManagement';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './components/styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    
    if (username === 'admin' && password === 'pass') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        {isAuthenticated ? (
          <>
            <Navigation onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appointment-management" element={<AppointmentManagement />} />
              <Route path="/patient-management" element={<PatientManagement />} />
              <Route path="/staff-management" element={<StaffManagement />} />
              <Route path="/supply-management" element={<SupplyManagement />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
