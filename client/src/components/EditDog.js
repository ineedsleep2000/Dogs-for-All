// src/components/EditDog.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../EditDog.css'; // Import the CSS file

function EditDog() {
  const { id } = useParams();
  const history = useHistory();
  const [dog, setDog] = useState({
    name: '',
    image: '',
    breed: '',
    time_in_shelter: '',
    adopted: false,
    shelter_id: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDog = async () => {
      const response = await fetch(`/dogs/${id}`);
      const data = response.json();
      setDog(data);
    };

    fetchDog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDog({
      ...dog,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dog),
      });

      if (response.ok) {
        history.push('/dogs');
      } else {
        setError('Failed to update dog. Please try again.');
      }
    } catch (error) {
      console.error('Error during dog update:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="edit-dog-container">
      <h1>Edit Dog</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={dog.name}
          onChange={handleChange}
          required
        />
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={dog.image}
          onChange={handleChange}
          required
        />
        <label>Adopted</label>
        <input
          type="checkbox"
          name="adopted"
          checked={dog.adopted}
          onChange={handleChange}
        />
        <label>Shelter ID</label>
        <input
          type="text"
          name="shelter_id"
          value={dog.shelter_id}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Dog</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default EditDog;
