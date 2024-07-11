import React from "react";
import "../Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>We’d love to hear from you</h1>
        <h4>
          Whether you’re curious about features, the shelters we work with, the
          dogs we work with, our future roadmap, or even more information about
          how Godzilla would technically be a dog—we’re ready to answer any and
          all questions.
        </h4>
      </header>
      <div className="contact-sections">
        <div className="contact-box">
          <h1>Features</h1>
          <p>
            We offer a few features, but our primary features is the ability to
            show a range of new and available dogs that you can adopt TODAY!
            You'll also be able to look at all the shelters we currently work
            with.
          </p>
          <p>
            If you would like to contact us about ideas or more information,
            please call our main office at (555)-Dogs-ForAll.
          </p>
        </div>
        <div className="contact-box">
          <h1>Support</h1>
          <p>
            If you need support in the app, please call our main office at
            (555)-Dogs-ForAll.
          </p>
          <p>
            If you want to support us in our endeavors to make more apps like
            this, be sure to send positive energy to our instructor Lantz, to
            influence him to give us a good grade on this app!
          </p>
        </div>
        <div className="contact-box">
          <h1>Roadmap</h1>
          <p>
            We are planning to add EVEN MORE FURRY FRIENDS! Eventually we'd
            especially love to be able to add cats to our list!
          </p>
          <p>
            If you would like to add your suggestions to our roadmap for future
            updates, please call our main office at (555)-Dogs-ForAll.
          </p>
        </div>
        <div className="contact-box">
          <h1>Godzilla, King of The Monsters</h1>
          <p>
            Besides the fact that Godzilla is not only the King of Monsters, and
            hes also over 70 years old. Godzilla is technically the bestest dog
            if you think about it because he is of course, mans best friend. (we
            will not accept any arguments about how Godzilla has destroyed
            private property, and/or misplaced personal belongings such as:
            homes, and or life)
          </p>
          <p>
            If you have a different theory on what Sauron is up to these days,
            we would love to hear it by giving us a call at our main office at
            (555)-Dogs-ForAll.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
