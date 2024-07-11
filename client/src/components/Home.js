import React from 'react';
import '../Home.css'; // Make sure to create this CSS file

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Dog Adoption</h1>
        <p>Your new best friend is waiting for you!</p>
      </header>
      <div className="home-gallery">
        <img src="https://media.istockphoto.com/id/1370010790/photo/pit-bull-dog-playing-and-having-fun-in-the-park-green-grass-wooden-stakes-around-selective.jpg?s=612x612&w=0&k=20&c=2BhKHzjGSTauuMVtrjEx6aDQrACAPV7iZ2ExQtxArzs=" alt="Pitbull" />
        <img src="https://images.unsplash.com/photo-1610041518868-f9284e7eecfe?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpaHVhaHVhfGVufDB8fDB8fHww" alt-="Chihuahua" />
        <img src="https://hips.hearstapps.com/ghk.h-cdn.co/assets/18/07/schnoodle.jpg" alt="Mutt" />
        <img src="https://dogacademy.org/blog/wp-content/uploads/2022/08/Australian-labradoodle-laying-outside.jpg" alt="Labradoodle" />
      </div>
      <section className="home-content">
        <h2>Why Adopt?</h2>
        <ul>
          <li>Save a life</li>
          <li>Find a loyal companion</li>
          <li>Reduce animal homelessness</li>
        </ul>
      </section>
      <section className="home-facts">
        <h2>Did You Know?</h2>
        <div className="fact-box">
          <h3>Shelter Facts</h3>
          <p>Over 3.3 million dogs enter U.S. animal shelters every year.</p>
          <p>Adopting a shelter dog helps to reduce overcrowding and gives another dog a chance to be adopted.</p>
        </div>
        <div className="fact-box">
          <h3>Dog Facts</h3>
          <p>Dogs have been our companions for over 14,000 years.</p>
          <p>Dogs have been shown to have therapeutic benefits, providing emotional support and even lowering stress levels. Studies have found that petting a dog can reduce blood pressure and promote relaxation.</p>
          <p>Dogs have an incredible sense of smell, which is why they are often used in search and rescue operations.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
