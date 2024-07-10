// src/components/EditDog.js
import React, { useEffect, useState } from 'react';
import DogForm from './DogForm';
import { useParams } from 'react-router-dom';

function EditDog() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    fetch(`/api/dogs/${id}`)
      .then((response) => response.json())
      .then((data) => setDog(data))
      .catch((error) => console.error('Error fetching dog:', error));
  }, [id]);

  const handleUpdateDog = async (updatedDog) => {
    const response = await fetch(`/dogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDog),
    });

    if (response.ok) {
      console.log('Dog updated successfully');
    } else {
      console.error('Error updating dog');
    }
  };

  if (!dog) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Dog</h2>
      <DogForm dog={dog} onSubmit={handleUpdateDog} />
    </div>
  );
}

export default EditDog;
