import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this hook is imported
import '../DogDetails.css';

const DogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { auth } = useAuth(); // Use the context to get the user
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const response = await fetch(`/dogs/${id}`);
        const data = await response.json();
        setDog(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dog details:', error);
        setLoading(false);
      }
    };

    fetchDog();
  }, [id]);

  const handleAdoptMe = () => {
    if (auth.user) {
      console.log(`Adopt clicked - Dog ID: ${dog.id}, Owner ID: ${auth.user.id}`);
      history.push({
        pathname: '/adopt',
        state: { dogId: dog.id, ownerId: auth.user.id }
      });
    } else {
      history.push('/login');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!dog) {
    return <p>Dog not found.</p>;
  }

  return (
    <div className="dog-details-container">
      <h1>{dog.name}</h1>
      <p><strong>Breed:</strong> {dog.breed}</p>
      <p><strong>Time in Shelter:</strong> {dog.time_in_shelter}</p>
      <p><strong>Adopted:</strong> {dog.adopted ? 'Yes' : 'No'}</p>
      <button className="adopt-button" onClick={handleAdoptMe}>Adopt Me</button>
    </div>
  );
};

export default DogDetails;
