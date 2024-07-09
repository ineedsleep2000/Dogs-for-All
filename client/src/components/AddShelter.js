// src/components/AddShelter.js
import React from 'react';
import ShelterForm from './ShelterForm';

function AddShelter() {
  const handleAddShelter = async (shelter) => {
    const response = await fetch('/shelters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shelter),
    });

    if (response.ok) {
      console.log('Shelter added successfully');
    } else {
      console.error('Error adding shelter');
    }
  };

  return (
    <div>
      <h2>Add Shelter</h2>
      <ShelterForm onSubmit={handleAddShelter} />
    </div>
  );
}

export default AddShelter;
