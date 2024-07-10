// src/components/Register.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isStaff, setIsStaff] = useState(false);  // Added for distinguishing staff
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, is_staff: isStaff }),  // Send is_staff value
      });

      if (response.ok) {
        history.push('/adopt');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isStaff}
            onChange={(e) => setIsStaff(e.target.checked)}
          />
          Register as Staff
        </label>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
