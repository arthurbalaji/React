const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Helper function to read and write to the JSON file
const readData = () => {
  const data = fs.readFileSync('data.json');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Save with 2-space indentation
};

// GET all appointments
app.get('/api/appointments', (req, res) => {
  const data = readData();
  res.json(data.appointments);
});

// POST a new appointment
app.post('/api/appointments', (req, res) => {
  const data = readData();
  const newAppointment = { id: data.appointments.length + 1, ...req.body };
  data.appointments.push(newAppointment);
  writeData(data);
  res.json(newAppointment);
});

// PUT (update) an appointment by ID
app.put('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.appointments.findIndex((a) => a.id == id);
  if (index !== -1) {
    data.appointments[index] = { ...data.appointments[index], ...req.body };
    writeData(data);
    res.json(data.appointments[index]);
  } else {
    res.status(404).json({ error: 'Appointment not found' });
  }
});

// DELETE an appointment by ID
app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  data.appointments = data.appointments.filter((a) => a.id != id);
  writeData(data);
  res.json({ message: 'Appointment deleted' });
});

// GET all patients
app.get('/api/patients', (req, res) => {
  const data = readData();
  res.json(data.patients);
});

// POST a new patient
app.post('/api/patients', (req, res) => {
  const data = readData();
  const newPatient = { id: data.patients.length + 1, ...req.body };
  data.patients.push(newPatient);
  writeData(data);
  res.json(newPatient);
});

// PUT (update) a patient by ID
app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.patients.findIndex((p) => p.id == id);
  if (index !== -1) {
    data.patients[index] = { ...data.patients[index], ...req.body };
    writeData(data);
    res.json(data.patients[index]);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

// DELETE a patient by ID
app.delete('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  data.patients = data.patients.filter((p) => p.id != id);
  writeData(data);
  res.json({ message: 'Patient deleted' });
});

// GET all staff
app.get('/api/staff', (req, res) => {
  const data = readData();
  res.json(data.staff);
});

// POST a new staff member
app.post('/api/staff', (req, res) => {
  const data = readData();
  const newStaff = { id: data.staff.length + 1, ...req.body };
  data.staff.push(newStaff);
  writeData(data);
  res.json(newStaff);
});

// PUT (update) a staff member by ID
app.put('/api/staff/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.staff.findIndex((s) => s.id == id);
  if (index !== -1) {
    data.staff[index] = { ...data.staff[index], ...req.body };
    writeData(data);
    res.json(data.staff[index]);
  } else {
    res.status(404).json({ error: 'Staff member not found' });
  }
});

// DELETE a staff member by ID
app.delete('/api/staff/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  data.staff = data.staff.filter((s) => s.id != id);
  writeData(data);
  res.json({ message: 'Staff member deleted' });
});

// GET all supplies
app.get('/api/supplies', (req, res) => {
  const data = readData();
  res.json(data.supplies);
});

// POST a new supply item
app.post('/api/supplies', (req, res) => {
  const data = readData();
  const newSupply = { id: data.supplies.length + 1, ...req.body };
  data.supplies.push(newSupply);
  writeData(data);
  res.json(newSupply);
});

// PUT (update) a supply item by ID
app.put('/api/supplies/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.supplies.findIndex((s) => s.id == id);
  if (index !== -1) {
    data.supplies[index] = { ...data.supplies[index], ...req.body };
    writeData(data);
    res.json(data.supplies[index]);
  } else {
    res.status(404).json({ error: 'Supply item not found' });
  }
});

// DELETE a supply item by ID
app.delete('/api/supplies/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  data.supplies = data.supplies.filter((s) => s.id != id);
  writeData(data);
  res.json({ message: 'Supply item deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
