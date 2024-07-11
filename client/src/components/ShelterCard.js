import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../ShelterCard.css';

function ShelterCard({ shelter, onDelete }) {
  const { isLoggedIn } = useAuth();
  const history = useHistory();

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    const response = await fetch(`/shelters/${shelter.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      onDelete(shelter.id);
    } else {
      console.error('Error deleting shelter');
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    history.push(`/edit-shelter/${shelter.id}`);
  };

  return (
    <div className="shelter-card" style={{ cursor: 'pointer' }}>
      <h3>{shelter.name}</h3>
      <p>Address: {shelter.address}</p>
      <p>Contact Number: {shelter.contact_number}</p>
      <p>Is Open: {shelter.is_open ? 'Yes' : 'No'}</p>
      {isLoggedIn && (
        <>
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
          <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
        </>
      )}
    </div>
  );
}

export default ShelterCard;
