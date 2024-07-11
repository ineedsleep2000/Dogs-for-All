// src/components/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import DogPage from './DogPage';
import DogDetails from './DogDetails';
import AddDog from './AddDog';
import EditDog from './EditDog';
import AddShelter from './AddShelter';
import EditShelter from './EditShelter';
import Shelters from './Shelters';
import Navbar from './Navbar';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Login from './Login';
import Register from './Register';
import AdoptApp from './AdoptApp';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  
    const fetchUser = async () => {
      const response = await fetch('/authorized');
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dogs" exact component={DogPage} />
          <Route path="/dogs/:id" component={(props) => <DogDetails {...props} user={user} />} />
          <Route path="/add-dog" component={AddDog} />
          <Route path="/edit-dog/:id" component={EditDog} />
          <Route path="/shelters" component={Shelters} />
          <Route path="/add-shelter" component={AddShelter} />
          <Route path="/edit-shelter/:id" component={EditShelter} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/login" component={(props) => <Login {...props} setUser={setUser} />} />
          <Route path="/register" component={(props) => <Register {...props} setUser={setUser} />} />
          <Route path="/adopt" component={(props) => <AdoptApp {...props} user={user} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
