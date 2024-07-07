import React, { useEffect, useState } from "react";
import Card from "./Card";

const Shelters = () => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/shelters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched shelters:", data); // Debug log
        setShelters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shelters:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (shelters.length === 0) {
    return <h2>No shelters available</h2>;
  }

  return (
    <div>
      <h2>Available Shelters</h2>
      <div className="card-container">
        {shelters.map((shelter) => (
          <Card
            key={shelter.id}
            id={shelter.id}
            name={shelter.name}
            location={shelter.location}
            type="shelters"
          />
        ))}
      </div>
    </div>
  );
};

export default Shelters;
