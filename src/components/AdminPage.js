import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      alert('Failed to fetch members');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await axios.delete(`/members/${id}`);
        fetchMembers();
        alert('Member deleted successfully');
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Failed to delete member');
      }
    }
  };

  const handleEdit = (member) => {
    setEditingMember({...member});
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditingMember(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/members/${editingMember.id}`, editingMember);
      fetchMembers();
      setEditingMember(null);
      alert('Member updated successfully');
    } catch (error) {
      console.error('Error updating member:', error);
      alert('Failed to update member');
    }
  };

  return (
    <div>
      <h2>Admin - Member Management</h2>
      {editingMember && (
        <form onSubmit={handleUpdate}>
          <h3>Edit Member</h3>
          <input
            type="text"
            name="name"
            value={editingMember.name}
            onChange={handleUpdateChange}
            placeholder="Full Name"
            required
          />
          <input
            type="number"
            name="age"
            value={editingMember.age}
            onChange={handleUpdateChange}
            placeholder="Age"
            min="18"
            required
          />
          <select
            name="gender"
            value={editingMember.gender}
            onChange={handleUpdateChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="address"
            value={editingMember.address}
            onChange={handleUpdateChange}
            placeholder="Address"
            required
          />
          <input
            type="tel"
            name="phone_number"
            value={editingMember.phone_number}
            onChange={handleUpdateChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="email"
            name="email_address"
            value={editingMember.email_address}
            onChange={handleUpdateChange}
            placeholder="Email Address"
            required
          />
          <button type="submit">Update Member</button>
          <button type="button" onClick={() => setEditingMember(null)}>Cancel</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.gender}</td>
              <td>{member.address}</td>
              <td>{member.phone_number}</td>
              <td>{member.email_address}</td>
              <td>
                <button onClick={() => handleEdit(member)}>Edit</button>
                <button onClick={() => handleDelete(member.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;