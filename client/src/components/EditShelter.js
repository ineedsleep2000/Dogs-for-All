// src/components/EditShelter.js
import React, { useEffect, useState } from 'react';
import ShelterForm from './ShelterForm';
import { useParams, useHistory } from 'react-router-dom';
import '../EditShelter.css'

function EditShelter() {
  const { id } = useParams();
  const history = useHistory();
  const [shelter, setShelter] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`/shelters/${id}`)
      .then((response) => response.json())
      .then((data) => setShelter(data))
      .catch((error) => {
        console.error('Error fetching shelter:', error);
        setError('Error fetching shelter');
      });
  }, [id]);

  const handleUpdateShelter = async (updatedShelter) => {
    setError('');
    setSuccess('');

    try {
      const response = fetch(`/shelters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedShelter),
      });

      if (response.ok) {
        setSuccess('Shelter updated successfully!');
        setTimeout(() => {
          history.push('/shelters');
        }, 2000); // Redirect to shelters page after 2 seconds
      } else {
        setError('Error updating shelter');
      }
    } catch (error) {
      console.error('Error updating shelter:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  if (!shelter) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Shelter</h2>
      <ShelterForm shelter={shelter} onSubmit={handleUpdateShelter} />
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default EditShelter;
