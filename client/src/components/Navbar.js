import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';
import logo from '../assets/dogsforall.png';

const Navigation = () => (
  <header className="navbar">
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
    <nav>
      <Link to="/">Home</Link> | <Link to="/dogs">Dogs</Link> | <Link to="/shelters">Shelters</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </nav>
  </header>
);

export default Navigation;
