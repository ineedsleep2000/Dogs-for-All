// src/components/EditDog.js
import React, { useEffect, useState } from 'react';
import DogForm from './DogForm';
import { useParams, useHistory } from 'react-router-dom';
import '../EditDog.css'; // Import the CSS file

function EditDog() {
  const { id } = useParams();
  const history = useHistory();
  const [dog, setDog] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`/dogs/${id}`)
      .then((response) => response.json())
      .then((data) => setDog(data))
      .catch((error) => {
        console.error('Error fetching dog:', error);
        setError('Error fetching dog');
      });
  }, [id]);

  const handleUpdateDog = async (updatedDog) => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDog),
      });

      if (response.ok) {
        setSuccess('Dog updated successfully!');
        setTimeout(() => {
          history.push('/dogs');
        }, 2000); // Redirect to dogs page after 2 seconds
      } else {
        setError('Error updating dog');
      }
    } catch (error) {
      console.error('Error updating dog:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  if (!dog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-dog-container">
      <h2>Edit Dog</h2>
      <DogForm dog={dog} onSubmit={handleUpdateDog} />
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default EditDog;
