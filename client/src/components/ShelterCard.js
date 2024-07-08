// src/components/ShelterCard.js
import React from 'react';

function ShelterCard({ shelter }) {
  return (
    <div className="shelter-card">
      <h3>{shelter.name}</h3>
      <p>Address: {shelter.address}</p>
      <p>Contact Number: {shelter.contact_number}</p>
      <p>Is Open: {shelter.is_open ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default ShelterCard;
