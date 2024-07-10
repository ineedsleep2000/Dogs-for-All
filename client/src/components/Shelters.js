// src/components/Shelters.js
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddShelter from "./AddShelter";
import ShelterList from "./ShelterList";
import EditShelter from "./EditShelter";

function Shelters() {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/add`} component={AddShelter} />
        <Route path={`${path}/edit/:id`} component={EditShelter} />
        <Route path={path} component={ShelterList} />
      </Switch>
    </div>
  );
}

export default Shelters;
