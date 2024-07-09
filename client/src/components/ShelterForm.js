// src/components/ShelterForm.js
import React, { useState, useEffect } from 'react';

function ShelterForm({ shelter, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact_number: '',
    is_open: false
  });

  useEffect(() => {
    if (shelter) {
      setFormData(shelter);
    }
  }, [shelter]);

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
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div>
        <label>Contact Number:</label>
        <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
      </div>
      <div>
        <label>Is Open:</label>
        <input type="checkbox" name="is_open" checked={formData.is_open} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ShelterForm;
