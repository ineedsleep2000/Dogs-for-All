// src/components/DogList.js
import React, { useEffect, useState } from 'react';
import DogCard from './DogCard';

function DogList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch('/dogs')
      .then((response) => response.json())
      .then((data) => setDogs(data));
  }, []);

  return (
    <div className="dog-list">
      <h2>Dogs</h2>
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
}

export default DogList;
