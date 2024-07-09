// src/components/DogForm.js
import React, { useState, useEffect } from 'react';

function DogForm({ dog, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    time_in_shelter: '',
    adopted: false,
    shelter_id: ''
  });

  useEffect(() => {
    if (dog) {
      setFormData(dog);
    }
  }, [dog]);

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
        <label>Breed:</label>
        <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />
      </div>
      <div>
        <label>Time in Shelter (days):</label>
        <input type="number" name="time_in_shelter" value={formData.time_in_shelter} onChange={handleChange} required />
      </div>
      <div>
        <label>Adopted:</label>
        <input type="checkbox" name="adopted" checked={formData.adopted} onChange={handleChange} />
      </div>
      <div>
        <label>Shelter ID:</label>
        <input type="number" name="shelter_id" value={formData.shelter_id} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DogForm;
