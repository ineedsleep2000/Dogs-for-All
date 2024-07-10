// src/components/DogDetails.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const DogDetails = ({ dog, user }) => {
  const history = useHistory();

  const handleAdoptMe = () => {
    if (user) {
      history.push({
        pathname: '/adopt',
        state: { dogId: dog.id, ownerId: user.id }
      });
    } else {
      history.push('/login');
    }
  };

  return (
    <div>
      <h1>{dog.name}</h1>
      <p>Breed: {dog.breed}</p>
      <p>Time in Shelter: {dog.time_in_shelter}</p>
      <p>Adopted: {dog.adopted ? 'Yes' : 'No'}</p>
      <button onClick={handleAdoptMe}>Adopt Me</button>
    </div>
  );
};

export default DogDetails;
