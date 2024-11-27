import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', department: '' });
  const [editingIndex, setEditingIndex] = useState(null); 

  
  useEffect(() => {
    axios.get('http://localhost:5000/api/staff') 
      .then(response => setStaff(response.data))
      .catch(error => console.error('Error fetching staff:', error));
  }, []);

  
  const addStaff = () => {
    axios.post('http://localhost:5000/api/staff', newStaff) 
      .then(response => {
        setStaff([...staff, response.data]);
        setNewStaff({ name: '', role: '', department: '' });
      })
      .catch(error => console.error('Error adding staff:', error));
  };

  
  const updateStaff = () => {
    axios.put(`http://localhost:5000/api/staff/${editingIndex}`, newStaff) 
      .then(response => {
        setStaff(staff.map(member => 
          member.id === editingIndex ? response.data : member
        ));
        setNewStaff({ name: '', role: '', department: '' });
        setEditingIndex(null); 
      })
      .catch(error => console.error('Error updating staff:', error));
  };

  
  const editStaff = (id) => {
    const staffToEdit = staff.find(member => member.id === id);
    setNewStaff({ 
      name: staffToEdit.name, 
      role: staffToEdit.role, 
      department: staffToEdit.department 
    });
    setEditingIndex(id); 
  };

  
  const deleteStaff = (id) => {
    axios.delete(`http://localhost:5000/api/staff/${id}`) 
      .then(() => {
        setStaff(staff.filter(member => member.id !== id));
      })
      .catch(error => console.error('Error deleting staff:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Staff Management</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Staff Name"
          value={newStaff.name}
          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newStaff.role}
          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={newStaff.department}
          onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
        />
        
        
        {editingIndex === null ? (
          <button onClick={addStaff}>Add Staff</button>
        ) : (
          <button onClick={updateStaff}>Update Staff</button>
        )}
      </div>

      <ul>
        {staff.length === 0 ? (
          <p>No staff members available</p>
        ) : (
          staff.map((member) => (
            <li key={member.id}>
              {member.name} - {member.role} ({member.department})
              <button onClick={() => editStaff(member.id)}>Edit</button>
              <button onClick={() => deleteStaff(member.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default StaffManagement;
