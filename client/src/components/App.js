import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import DogDetail from "./DogDetail";
import Dogs from "./Dogs";
import Login from "./Login";
import Register from "./Register";
import Adopt from "./Adopt";
import Navigation from "./Navbar";
import ShelterDetail from "./ShelterDetail";
import Shelters from "./Shelters";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dogs/:id" component={DogDetail} />
        <Route exact path="/dogs" component={Dogs} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/adopt" component={Adopt} />
        <Route exact path="/shelters" component={Shelters} />
        <Route path="/shelters/:id" component={ShelterDetail} />
      </Switch>
    </div>
  );
}

export default App;
