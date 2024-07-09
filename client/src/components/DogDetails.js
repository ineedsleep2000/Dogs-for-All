// src/components/DogDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DogDetails() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    fetch(`/dogs/${id}`)
      .then((response) => response.json())
      .then((data) => setDog(data))
      .catch((error) => console.error('Error fetching dog:', error));
  }, [id]);

  if (!dog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dog-details">
      <h2>{dog.name}</h2>
      <p>Breed: {dog.breed}</p>
      <p>Time in Shelter: {dog.time_in_shelter} days</p>
      <p>Adopted: {dog.adopted ? 'Yes' : 'No'}</p>
      <p>Shelter: {dog.shelter.name}</p> {/* Assuming the API provides the shelter's name */}
    </div>
  );
}

export default DogDetails;
