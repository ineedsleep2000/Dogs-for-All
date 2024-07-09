// src/components/AddDog.js
import React from 'react';
import DogForm from './DogForm';

function AddDog() {
  const handleAddDog = async (dog) => {
    const response = await fetch('/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dog),
    });

    if (response.ok) {
      console.log('Dog added successfully');
    } else {
      console.error('Error adding dog');
    }
  };

  return (
    <div>
      <h2>Add Dog</h2>
      <DogForm onSubmit={handleAddDog} />
    </div>
  );
}

export default AddDog;
