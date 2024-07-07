import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, image, location, type }) => (
  <div className="card">
    {image && <img src={image} alt={name} />}
    <div className="card-content">
      <h3>{name}</h3>
      {location && <p>{location}</p>}
      <Link to={`/${type}/${id}`}>View Details</Link>
    </div>
  </div>
);

export default Card;