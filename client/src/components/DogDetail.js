import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DogDetail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/dogs/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDog(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dog details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!dog) {
    return <h2>Dog not found</h2>;
  }

  return (
    <div>
      <img src={dog.image} alt={dog.name} width="300" />
      <h2>{dog.name}</h2>
      <p>More details about the dog...</p>
    </div>
  );
};

export default DogDetail;
