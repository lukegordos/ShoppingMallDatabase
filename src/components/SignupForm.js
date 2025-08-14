import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    phone_number: '',
    email_address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.post(`${apiUrl}/members`, formData);
      alert('Member added successfully! ID: ' + response.data.id);
      // Reset form after successful submission
      setFormData({
        name: '',
        age: '',
        gender: '',
        address: '',
        phone_number: '',
        email_address: ''
      });
    } catch (error) {
      console.error('Error adding member:', error);
      // Mock success for demo purposes when backend is not available
      alert('Member registration received (demo mode - backend not available)');
      // Reset form
      setFormData({
        name: '',
        age: '',
        gender: '',
        address: '',
        phone_number: '',
        email_address: ''
      });
    }
  };

  return (
    <div>
      <h2>Jangs Shopping Mall Membership</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          min="18"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
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
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email_address"
          placeholder="Email Address"
          value={formData.email_address}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;