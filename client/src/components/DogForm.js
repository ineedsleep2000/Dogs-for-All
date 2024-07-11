// src/components/DogForm.js
import React, { useState } from 'react';

function DogForm({ dog, onSubmit }) {
  const [formData, setFormData] = useState({
    name: dog.name || '',
    image: dog.image || '',
    breed: dog.breed || '',
    adopted: dog.adopted || false,
    shelter_id: dog.shelter_id || ''
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
      <label>Image URL</label>
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <label>Breed</label>
      <input
        type="text"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        required
      />
      <label>Adopted</label>
      <input
        type="checkbox"
        name="adopted"
        checked={formData.adopted}
        onChange={handleChange}
      />
      <label>Shelter ID</label>
      <input
        type="text"
        name="shelter_id"
        value={formData.shelter_id}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Dog</button>
    </form>
  );
}

export default DogForm;
