import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function SupplyManagement() {
  const [supplies, setSupplies] = useState([]);
  const [newSupply, setNewSupply] = useState({ item: '', quantity: '', supplier: '' });
  const [editingIndex, setEditingIndex] = useState(null); 

  
  useEffect(() => {
    axios.get('http://localhost:5000/api/supplies') 
      .then(response => setSupplies(response.data))
      .catch(error => console.error('Error fetching supplies:', error));
  }, []);

  
  const addSupply = () => {
    axios.post('http://localhost:5000/api/supplies', newSupply) 
      .then(response => {
        setSupplies([...supplies, response.data]);
        setNewSupply({ item: '', quantity: '', supplier: '' });
      })
      .catch(error => console.error('Error adding supply:', error));
  };

  
  const updateSupply = () => {
    axios.put(`http://localhost:5000/api/supplies/${editingIndex}`, newSupply) 
      .then(response => {
        setSupplies(supplies.map(supply => 
          supply.id === editingIndex ? response.data : supply
        ));
        setNewSupply({ item: '', quantity: '', supplier: '' });
        setEditingIndex(null); 
      })
      .catch(error => console.error('Error updating supply:', error));
  };

  
  const editSupply = (id) => {
    const supplyToEdit = supplies.find(supply => supply.id === id);
    setNewSupply({ 
      item: supplyToEdit.item, 
      quantity: supplyToEdit.quantity, 
      supplier: supplyToEdit.supplier 
    });
    setEditingIndex(id); 
  };

  
  const deleteSupply = (id) => {
    axios.delete(`http://localhost:5000/api/supplies/${id}`) 
      .then(() => {
        setSupplies(supplies.filter(supply => supply.id !== id));
      })
      .catch(error => console.error('Error deleting supply:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Supply Management</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Item Name"
          value={newSupply.item}
          onChange={(e) => setNewSupply({ ...newSupply, item: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newSupply.quantity}
          onChange={(e) => setNewSupply({ ...newSupply, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Supplier"
          value={newSupply.supplier}
          onChange={(e) => setNewSupply({ ...newSupply, supplier: e.target.value })}
        />
        
        
        {editingIndex === null ? (
          <button onClick={addSupply}>Add Supply</button>
        ) : (
          <button onClick={updateSupply}>Update Supply</button>
        )}
      </div>

      <ul>
        {supplies.length === 0 ? (
          <p>No supplies available</p>
        ) : (
          supplies.map((supply) => (
            <li key={supply.id}>
              {supply.item} - {supply.quantity} units (Supplier: {supply.supplier})
              <button onClick={() => editSupply(supply.id)}>Edit</button>
              <button onClick={() => deleteSupply(supply.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default SupplyManagement;
