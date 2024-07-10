import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../AddDog.css'; // Import the CSS file

const AddDog = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [timeInShelter, setTimeInShelter] = useState('');
  const [adopted, setAdopted] = useState(false);
  const [shelterId, setShelterId] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/dogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          breed,
          time_in_shelter: new Date(timeInShelter).toISOString(),
          adopted,
          shelter_id: shelterId
        }),
      });

      if (response.ok) {
        // Clear the form fields or redirect the user
        setName('');
        setBreed('');
        setTimeInShelter('');
        setAdopted(false);
        setShelterId('');
        // Redirect to the dogs list page
        history.push('/dogs');
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
          type="number"
          value={shelterId}
          onChange={(e) => setShelterId(e.target.value)}
          required
        />
        <button type="submit">Add Dog</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddDog;
