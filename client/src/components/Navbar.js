// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Navbar.css';
import logo from "../assets/dogsforall.png";

function Navbar() {
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
        <NavLink to="/login" activeClassName="active">
          Login
        </NavLink>
        <NavLink to="/register" activeClassName="active">
          Register
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
