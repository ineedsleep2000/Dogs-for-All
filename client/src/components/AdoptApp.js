// src/components/AdoptApp.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function AdoptApp() {
  const { auth } = useAuth();
  const [adoptionData, setAdoptionData] = useState({
    adoptionFee: '',
    ownerId: auth.user ? auth.user.id : null,
    dogId: '',
  });

  const handleChange = (e) => {
    setAdoptionData({
      ...adoptionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit adoption application data to the API
    const response = await fetch('/api/adopt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adoptionData),
    });

    if (response.ok) {
      console.log('Adoption application submitted successfully');
    } else {
      console.log('Failed to submit adoption application');
    }
  };

  return (
    <div>
      <h1>Adopt a Dog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Adoption Fee:</label>
          <input
            type="number"
            name="adoptionFee"
            value={adoptionData.adoptionFee}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dog ID:</label>
          <input
            type="number"
            name="dogId"
            value={adoptionData.dogId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default AdoptApp;
