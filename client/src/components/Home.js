import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to Dogs for All</h1>
    <p>Your one-stop destination for finding your next furry friend and exploring local shelters.</p>
    <nav>
      <Link to="/dogs">View Dogs</Link> | <Link to="/shelters">View Shelters</Link>
    </nav>
  </div>
);

export default Home;
