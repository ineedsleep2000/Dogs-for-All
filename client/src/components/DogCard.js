// src/components/DogCard.js
import React from 'react';

function DogCard({ dog }) {
  return (
    <div className="dog-card">
      <h3>{dog.name}</h3>
      <p>Breed: {dog.breed}</p>
      <p>Time in Shelter: {dog.time_in_shelter} days</p>
      <p>Adopted: {dog.adopted ? 'Yes' : 'No'}</p>
      <p>Shelter ID: {dog.shelter_id}</p>
    </div>
  );
}

export default DogCard;
