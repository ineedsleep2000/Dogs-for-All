import React, { useState } from 'react';
import '../AddShelter.css'; // Import the CSS file

const AddShelter = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/shelters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address, contact_number: contactNumber, is_open: isOpen }),
      });

      if (response.ok) {
        setSuccess('Shelter added successfully!');
        setName('');
        setAddress('');
        setContactNumber('');
        setIsOpen(false);
      } else {
        setError('Failed to add shelter. Please try again.');
      }
    } catch (error) {
      console.error('Error during shelter addition:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="add-shelter-container">
      <h1>Add Shelter</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label>Contact Number</label>
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
        <label>Is Open</label>
        <input
          type="checkbox"
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
        />
        <button type="submit">Add Shelter</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default AddShelter;
