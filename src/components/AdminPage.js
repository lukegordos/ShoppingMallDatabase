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
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.get(`${apiUrl}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      // Show mock data when backend is not available
      setMembers([
        {
          id: 1,
          name: 'John Doe',
          age: 25,
          gender: 'Male',
          address: '123 Main St, City',
          phone_number: '555-0123',
          email_address: 'john.doe@email.com'
        },
        {
          id: 2,
          name: 'Jane Smith',
          age: 30,
          gender: 'Female',
          address: '456 Oak Ave, Town',
          phone_number: '555-0456',
          email_address: 'jane.smith@email.com'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          age: 28,
          gender: 'Male',
          address: '789 Pine Rd, Village',
          phone_number: '555-0789',
          email_address: 'mike.johnson@email.com'
        }
      ]);
      console.log('Using mock data - backend not available');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || '';
        await axios.delete(`${apiUrl}/members/${id}`);
        fetchMembers();
        alert('Member deleted successfully');
      } catch (error) {
        console.error('Error deleting member:', error);
        // Mock delete for demo purposes when backend is not available
        setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
        alert('Member deleted (demo mode - backend not available)');
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
      const apiUrl = process.env.REACT_APP_API_URL || '';
      await axios.put(`${apiUrl}/members/${editingMember.id}`, editingMember);
      fetchMembers();
      setEditingMember(null);
      alert('Member updated successfully');
    } catch (error) {
      console.error('Error updating member:', error);
      // Mock update for demo purposes when backend is not available
      setMembers(prevMembers => 
        prevMembers.map(member => 
          member.id === editingMember.id ? editingMember : member
        )
      );
      setEditingMember(null);
      alert('Member updated (demo mode - backend not available)');
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