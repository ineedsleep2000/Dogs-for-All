// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import DogPage from './DogPage';
import DogDetails from './DogDetails'; // Import the DogDetails component
import AddDog from './AddDog'; // Import AddDog component
import EditDog from './EditDog'; // Import EditDog component
import AddShelter from './AddShelter'; // Import AddShelter component
import EditShelter from './EditShelter'; // Import EditShelter component
import Shelters from './Shelters';
import Navbar from './Navbar';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Login from './Login';
import Register from './Register';
import AdoptApp from './AdoptApp';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dogs" exact component={DogPage} />
          <Route path="/dogs/:id" component={DogDetails} /> {/* Add the route for dog details */}
          <Route path="/add-dog" component={AddDog} /> {/* Add route for adding dogs */}
          <Route path="/edit-dog/:id" component={EditDog} /> {/* Add route for editing dogs */}
          <Route path="/shelters" component={Shelters} />
          <Route path="/add-shelter" component={AddShelter} /> {/* Add route for adding shelters */}
          <Route path="/edit-shelter/:id" component={EditShelter} /> {/* Add route for editing shelters */}
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/adopt" component={AdoptApp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
