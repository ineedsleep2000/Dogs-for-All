// src/components/AdoptApp.js
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../AdoptApp.css'; // Import the CSS file

const AdoptApp = ({ user }) => {
  const location = useLocation();
  const { dogId } = location.state || {};
  const [applicationFee, setApplicationFee] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (dogId && user && user.id) {
      setApplicationFee((Math.random() * 100).toFixed(2)); // Generate a random fee between 0 and 100
    }
  }, [dogId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user || !user.id) {
      setError('User not logged in');
      return;
    }

    try {
      const response = await fetch('/adoption_applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dog_id: dogId, owner_id: user.id, adoption_fee: applicationFee }),
      });

      if (response.ok) {
        history.push('/confirmation'); // Redirect to a confirmation page or wherever appropriate
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.errors || 'Failed to submit application. Please try again.');
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
        <label>Dog ID</label>
        <input
          type="text"
          value={dogId || ''}
          readOnly
        />
        <label>Owner ID</label>
        <input
          type="text"
          value={user ? user.id : ''}
          readOnly
        />
        <label>Application Fee</label>
        <input
          type="number"
          value={applicationFee}
          readOnly
        />
        <button type="submit">Submit Application</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdoptApp;
