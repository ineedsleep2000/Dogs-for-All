// src/components/DogCard.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../DogCard.css';

function DogCard({ dog, onDelete }) {
  const { auth } = useAuth();
  const history = useHistory();

  const handleAdoptClick = () => {
    if (!auth.isLoggedIn) {
      history.push('/login');
    } else {
      history.push({
        pathname: '/adopt',
        state: { dogId: dog.id },
      });
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    const response = await fetch(`/dogs/${dog.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      onDelete(dog.id);
    } else {
      console.error('Error deleting dog');
    }
  };

  const handleCardClick = () => {
    history.push({
      pathname: `/dogs/${dog.id}`,
      state: { dogId: dog.id }
    });
  };

  return (
    <div className="dog-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <h3>{dog.name}</h3>
      <p>Breed: {dog.breed}</p>
      <p>Time in Shelter: {dog.time_in_shelter} days</p>
      <p>Adopted: {dog.adopted ? 'Yes' : 'No'}</p>
      <p>Shelter ID: {dog.shelter_id}</p>
      <button onClick={(e) => { e.stopPropagation(); handleAdoptClick(); }}>Adopt Me</button>
      {auth.isLoggedIn && (
        <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(e); }}>Delete</button>
      )}
    </div>
  );
}

export default DogCard;
