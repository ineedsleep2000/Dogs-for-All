import React, { useEffect, useState } from 'react';
import DogCard from './DogCard';

function DogList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch('/dogs')
      .then((response) => response.json())
      .then((data) => setDogs(data));
  }, []);

  const handleDeleteDog = (id) => {
    setDogs(dogs.filter(dog => dog.id !== id));
  };

  return (
    <div className="dog-list">
      <h2>Dogs</h2>
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} onDelete={handleDeleteDog} />
      ))}
    </div>
  );
}

export default DogList;
