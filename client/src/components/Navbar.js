// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../Navbar.css';
import logo from '../assets/dogsforall.png';

function Navbar() {
  const { auth, logout } = useAuth();

  return (
    <header>
      <img src={logo} alt="Dogs for All Logo" className="logo" />
      <nav>
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/dogs" activeClassName="active">
          Dogs
        </NavLink>
        <NavLink to="/shelters" activeClassName="active">
          Shelters
        </NavLink>
        <NavLink to="/about-us" activeClassName="active">
          About Us
        </NavLink>
        <NavLink to="/contact-us" activeClassName="active">
          Contact Us
        </NavLink>
        {auth.isLoggedIn ? (
          <>
            <NavLink to="/add-dog" activeClassName="active">
              Add Dog
            </NavLink>
            <NavLink to="/add-shelter" activeClassName="active">
              Add Shelter
            </NavLink>
            <NavLink to="/adopt" activeClassName="active">
              Adopt
            </NavLink>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/register" activeClassName="active">
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
