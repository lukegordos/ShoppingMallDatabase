const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

db.initializeDatabase()
  .then(() => console.log('Database initialized'))
  .catch(err => console.error('Database initialization error:', err));

app.post('/members', async (req, res) => {
  try {
    const newMember = req.body;
    const result = await db.addMember(newMember);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Failed to add member', details: error.message });
  }
});

app.get('/members', async (req, res) => {
  try {
    const members = await db.getAllMembers();
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

app.put('/members/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMember = req.body;
    await db.updateMember(id, updatedMember);
    res.status(200).json({ message: 'Member updated successfully' });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

app.delete('/members/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.deleteMember(id);
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});