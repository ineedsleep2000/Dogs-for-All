import React, { useEffect, useState } from 'react';
import ShelterCard from './ShelterCard';

function ShelterList() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    fetch('/shelters')
      .then((response) => response.json())
      .then((data) => setShelters(data));
  }, []);

  const handleDeleteShelter = (id) => {
    setShelters(shelters.filter(shelter => shelter.id !== id));
  };

  return (
    <div className="shelter-list">
      <h2>Shelters</h2>
      {shelters.map((shelter) => (
        <ShelterCard key={shelter.id} shelter={shelter} onDelete={handleDeleteShelter} />
      ))}
    </div>
  );
}

export default ShelterList;
