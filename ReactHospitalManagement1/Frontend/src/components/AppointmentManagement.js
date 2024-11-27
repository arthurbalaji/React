import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ name: '', date: '', time: '', doctor: '' });
  const [editingIndex, setEditingIndex] = useState(null); 

  
  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  
  const addAppointment = () => {
    axios.post('http://localhost:5000/api/appointments', newAppointment)
      .then(response => {
        setAppointments([...appointments, response.data]);
        setNewAppointment({ name: '', date: '', time: '', doctor: '' });
      })
      .catch(error => console.error('Error adding appointment:', error));
  };

  
  const updateAppointment = () => {
    axios.put(`http://localhost:5000/api/appointments/${editingIndex}`, newAppointment)
      .then(response => {
        setAppointments(appointments.map(appointment => 
          appointment.id === editingIndex ? response.data : appointment
        ));
        setNewAppointment({ name: '', date: '', time: '', doctor: '' });
        setEditingIndex(null); 
      })
      .catch(error => console.error('Error updating appointment:', error));
  };

  
  const editAppointment = (id) => {
    const appointmentToEdit = appointments.find(appointment => appointment.id === id);
    setNewAppointment({ 
      name: appointmentToEdit.name, 
      date: appointmentToEdit.date, 
      time: appointmentToEdit.time, 
      doctor: appointmentToEdit.doctor 
    });
    setEditingIndex(id); 
  };

  
  const deleteAppointment = (id) => {
    axios.delete(`http://localhost:5000/api/appointments/${id}`)
      .then(() => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
      })
      .catch(error => console.error('Error deleting appointment:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Appointment Management</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Patient Name"
          value={newAppointment.name}
          onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={newAppointment.date}
          onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
        />
        <input
          type="time"
          placeholder="Time"
          value={newAppointment.time}
          onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Doctor"
          value={newAppointment.doctor}
          onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
        />
        
        
        {editingIndex === null ? (
          <button onClick={addAppointment}>Add Appointment</button>
        ) : (
          <button onClick={updateAppointment}>Update Appointment</button>
        )}
      </div>

      <ul>
        {appointments.length === 0 ? (
          <p>No appointments available</p>
        ) : (
          appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.name} - {appointment.date} at {appointment.time} with {appointment.doctor}
              <button onClick={() => editAppointment(appointment.id)}>Edit</button> 
              <button onClick={() => deleteAppointment(appointment.id)}>Delete</button> 
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default AppointmentManagement;
