import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShelterDetail = () => {
  const { id } = useParams();
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/shelters/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setShelter(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shelter details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!shelter) {
    return <h2>Shelter not found</h2>;
  }

  return (
    <div>
      <h2>{shelter.name}</h2>
      <p>Location: {shelter.location}</p>
      <p>Contact: {shelter.contact}</p>
      <p>More details about the shelter...</p>
    </div>
  );
};

export default ShelterDetail;
