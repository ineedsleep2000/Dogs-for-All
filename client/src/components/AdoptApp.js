import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../AdoptApp.css';

const AdoptApp = () => {
  const location = useLocation();
  const history = useHistory();
  const { user } = useAuth();
  const [adoptionFee, setAdoptionFee] = useState(Math.floor(Math.random() * 100) + 1); // Random fee between 1 and 100
  const [dogId, setDogId] = useState('');
  const [ownerId, setOwnerId] = useState(user?.id);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (location.state) {
      setDogId(location.state.dogId);
    }
    if (user) {
      setOwnerId(user.id);
    }
    console.log('Owner ID:', user ? user.id : 'No user');
    console.log('Dog ID:', location.state ? location.state.dogId : 'No dog ID');
  }, [location.state, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const payload = {
        adoption_fee: adoptionFee,
        owner_id: ownerId,
        dog_id: dogId
      };
      console.log('Submitting payload:', payload); // Log the payload

      const response = await fetch('/adoption_applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess('Application submitted successfully!');
      } else {
        const errorText = await response.text();
        console.error('Failed to submit application:', errorText);
        setError('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error during application submission:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="adopt-app-container">
      <h1>Adoption Application</h1>
      <form onSubmit={handleSubmit}>
        <label>Adoption Fee</label>
        <input
          type="number"
          value={adoptionFee}
          readOnly
        />
        <label>Owner ID</label>
        <input
          type="text"
          value={ownerId}
          readOnly
        />
        <label>Dog ID</label>
        <input
          type="text"
          value={dogId}
          readOnly
        />
        <button type="submit">Submit Application</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default AdoptApp;
