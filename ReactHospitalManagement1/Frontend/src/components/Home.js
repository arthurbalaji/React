import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function Home() {
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [activeStaff, setActiveStaff] = useState(0);
  const [availableSupplies, setAvailableSupplies] = useState(0);

  
  useEffect(() => {
    
    const fetchData = () => {
      
      axios.get('http://localhost:5000/api/appointments')
        .then(response => {
          const today = new Date().toISOString().split('T')[0]; 
          const appointmentsForToday = response.data.filter(appointment => appointment.date === today);
          setAppointmentsToday(appointmentsForToday.length);
        })
        .catch(error => console.error('Error fetching appointments:', error));

      
      axios.get('http://localhost:5000/api/patients')
        .then(response => {
          setTotalPatients(response.data.length);
        })
        .catch(error => console.error('Error fetching patients:', error));

      
      axios.get('http://localhost:5000/api/staff')
        .then(response => {
          setActiveStaff(response.data.length);
        })
        .catch(error => console.error('Error fetching staff:', error));

      
      axios.get('http://localhost:5000/api/supplies')
        .then(response => {
          const totalSupplies = response.data.reduce((total, supply) => 
            total + Number(supply.quantity), 0); 
          setAvailableSupplies(totalSupplies); 
        })
        .catch(error => console.error('Error fetching supplies:', error));
    };

    
    fetchData();
    const interval = setInterval(fetchData, 5000);

    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Hospital Management System</h1>
      <p>
        This system allows hospital administrators to manage appointments, patient records, staff information, 
        and supplies efficiently. It is designed to streamline operations and improve the quality of healthcare services.
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
        <div className="stat-box">
          <h3>Appointments Today</h3>
          <p>{appointmentsToday}</p>
        </div>
        <div className="stat-box">
          <h3>Total Patients</h3>
          <p>{totalPatients}</p>
        </div>
        <div className="stat-box">
          <h3>Active Staff</h3>
          <p>{activeStaff}</p>
        </div>
        <div className="stat-box">
          <h3>Available Supplies</h3>
          <p>{availableSupplies} items</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
