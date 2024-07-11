// src/components/AddDog.js
import React, { useState } from 'react';
import { format } from 'date-fns';
import '../AddDog.css';

const AddDog = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [breed, setBreed] = useState('');
  const [timeInShelter, setTimeInShelter] = useState('');
  const [adopted, setAdopted] = useState(false);
  const [shelterId, setShelterId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formattedTimeInShelter = format(new Date(timeInShelter), 'MMM dd yyyy hh:mma');

      const response = await fetch('/dogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          image, 
          breed, 
          time_in_shelter: formattedTimeInShelter, 
          adopted, 
          shelter_id: shelterId 
        }),
      });

      if (response.ok) {
        setSuccess('Dog added successfully!');
      } else {
        setError('Failed to add dog. Please try again.');
      }
    } catch (error) {
      console.error('Error during dog addition:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="add-dog-container">
      <h1>Add Dog</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <label>Breed</label>
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
        <label>Time in Shelter</label>
        <input
          type="datetime-local"
          value={timeInShelter}
          onChange={(e) => setTimeInShelter(e.target.value)}
          required
        />
        <label>Adopted</label>
        <input
          type="checkbox"
          checked={adopted}
          onChange={(e) => setAdopted(e.target.checked)}
        />
        <label>Shelter ID</label>
        <input
          type="text"
          value={shelterId}
          onChange={(e) => setShelterId(e.target.value)}
          required
        />
        <button type="submit">Add Dog</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default AddDog;
