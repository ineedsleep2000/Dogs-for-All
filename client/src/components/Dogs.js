import React, { useEffect, useState } from "react";
import Card from "./Card";

const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/dogs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched dogs:", data); // Debug log
        setDogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (dogs.length === 0) {
    return <h2>No dogs available for adoption</h2>;
  }

  return (
    <div>
      <h2>Available Dogs for Adoption</h2>
      <div className="card-container">
        {dogs.map((dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            image={dog.image}
            type="dogs"
          />
        ))}
      </div>
    </div>
  );
};

export default Dogs;
