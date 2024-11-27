import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '', admitted: '' });
  const [editingIndex, setEditingIndex] = useState(null); 

  
  useEffect(() => {
    axios.get('http://localhost:5000/api/patients') 
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  
  const addPatient = () => {
    axios.post('http://localhost:5000/api/patients', newPatient) 
      .then(response => {
        setPatients([...patients, response.data]);
        setNewPatient({ name: '', age: '', condition: '', admitted: '' });
      })
      .catch(error => console.error('Error adding patient:', error));
  };

  
  const updatePatient = () => {
    axios.put(`http://localhost:5000/api/patients/${editingIndex}`, newPatient) 
      .then(response => {
        setPatients(patients.map(patient => 
          patient.id === editingIndex ? response.data : patient
        ));
        setNewPatient({ name: '', age: '', condition: '', admitted: '' });
        setEditingIndex(null); 
      })
      .catch(error => console.error('Error updating patient:', error));
  };

  
  const editPatient = (id) => {
    const patientToEdit = patients.find(patient => patient.id === id);
    setNewPatient({ 
      name: patientToEdit.name, 
      age: patientToEdit.age, 
      condition: patientToEdit.condition, 
      admitted: patientToEdit.admitted 
    });
    setEditingIndex(id); 
  };

  
  const deletePatient = (id) => {
    axios.delete(`http://localhost:5000/api/patients/${id}`) 
      .then(() => {
        setPatients(patients.filter(patient => patient.id !== id));
      })
      .catch(error => console.error('Error deleting patient:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Patient Management</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Patient Name"
          value={newPatient.name}
          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Condition"
          value={newPatient.condition}
          onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
        />
        <input
          type="date"
          placeholder="Admitted Date"
          value={newPatient.admitted}
          onChange={(e) => setNewPatient({ ...newPatient, admitted: e.target.value })}
        />
        
        
        {editingIndex === null ? (
          <button onClick={addPatient}>Add Patient</button>
        ) : (
          <button onClick={updatePatient}>Update Patient</button>
        )}
      </div>

      <ul>
        {patients.length === 0 ? (
          <p>No patients available</p>
        ) : (
          patients.map((patient) => (
            <li key={patient.id}>
              {patient.name} - {patient.age} years - {patient.condition} (Admitted: {patient.admitted})
              <button onClick={() => editPatient(patient.id)}>Edit</button>
              <button onClick={() => deletePatient(patient.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default PatientManagement;
