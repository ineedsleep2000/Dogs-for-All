// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import DogPage from './DogPage';
import Shelters from './Shelters';
import Navbar from './Navbar';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dogs" component={DogPage} />
          <Route path="/shelters" component={Shelters} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
