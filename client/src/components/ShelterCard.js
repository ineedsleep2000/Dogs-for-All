// src/components/ShelterCard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../ShelterCard.css'; 

function ShelterCard({ shelter, onDelete }) {
  const { auth } = useAuth();

  const handleDeleteClick = async () => {
    const response = await fetch(`/shelters/${shelter.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      onDelete(shelter.id);
    } else {
      console.error('Error deleting shelter');
    }
  };

  return (
    <div className="shelter-card">
      <h3>{shelter.name}</h3>
      <p>Address: {shelter.address}</p>
      <p>Contact Number: {shelter.contact_number}</p>
      <p>Is Open: {shelter.is_open ? 'Yes' : 'No'}</p>
      {auth.isLoggedIn && (
        <button onClick={handleDeleteClick}>Delete</button>
      )}
    </div>
  );
}

export default ShelterCard;
