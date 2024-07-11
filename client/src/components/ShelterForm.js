// src/components/ShelterForm.js
import React, { useState } from 'react';

function ShelterForm({ shelter, onSubmit }) {
  const [formData, setFormData] = useState({
    name: shelter.name || '',
    address: shelter.address || '',
    contact_number: shelter.contact_number || '',
    is_open: shelter.is_open || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label>Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <label>Contact Number</label>
      <input
        type="text"
        name="contact_number"
        value={formData.contact_number}
        onChange={handleChange}
        required
      />
      <label>Is Open</label>
      <input
        type="checkbox"
        name="is_open"
        checked={formData.is_open}
        onChange={handleChange}
      />
      <button type="submit">Update Shelter</button>
    </form>
  );
}

export default ShelterForm;
