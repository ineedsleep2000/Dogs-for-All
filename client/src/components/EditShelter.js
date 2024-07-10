// src/components/EditShelter.js
import React, { useEffect, useState } from 'react';
import ShelterForm from './ShelterForm';
import { useParams } from 'react-router-dom';

function EditShelter() {
  const { id } = useParams();
  const [shelter, setShelter] = useState(null);

  useEffect(() => {
    fetch(`/shelters/${id}`)
      .then((response) => response.json())
      .then((data) => setShelter(data))
      .catch((error) => console.error('Error fetching shelter:', error));
  }, [id]);

  const handleUpdateShelter = async (updatedShelter) => {
    const response = await fetch(`/shelters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedShelter),
    });

    if (response.ok) {
      console.log('Shelter updated successfully');
    } else {
      console.error('Error updating shelter');
    }
  };

  if (!shelter) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Shelter</h2>
      <ShelterForm shelter={shelter} onSubmit={handleUpdateShelter} />
    </div>
  );
}

export default EditShelter;
