import React from "react";
import "../About.css";

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>A little bit about us</h1>
        <h4>
          Our team here at Dogs-For-All, all believe that we should try to
          better the lives of pets and animals, and a good step forward is
          making them available to you!
        </h4>
      </header>
      <div className="about-sections">
        <div className="about-box">
          <h1>Our Story</h1>
          <p>
            We started out as students at Flatiron Schools, Software Engineering
            Program, but now since making this app, we have achieved new heights
            to our coding knowledge.
          </p>
        </div>
        <div className="about-box">
          <h1>Our Goals</h1>
          <p>
            Our goal is to make a good grade for our Phase-4 Final Code Project
            at Flatiron Schools.
          </p>
          <p>
            If you want to support us in our endeavors to make more apps like
            this and succeed in completing phase-4 at Flatiron Schools, be sure
            to send positive energy to our instructor, to influence him to give
            us a good grade on this app!
          </p>
        </div>
        <div className="about-box">
          <h1>Roadmap</h1>
          <p>
            We are planning to add EVEN MORE FURRY FRIENDS! Eventually we'd
            especially love to be able to add cats to our list!
          </p>
          <p>
            If you would like to add your suggestions to our roadmap for future
            updates, please call our main office at (555)-Dogs-For-All.
          </p>
        </div>
        <div className="about-box">
          <h1>Fun Facts</h1>
          <p>Our team here at Dogs-For-All LOVES all types of animals!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
