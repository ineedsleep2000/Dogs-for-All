// src/components/DogPage.js
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddDog from './AddDog';
import DogList from './DogList';
import EditDog from './EditDog';

function DogPage() {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/add`} component={AddDog} />
        <Route path={`${path}/edit/:id`} component={EditDog} />
        <Route path={path} component={DogList} />
      </Switch>
    </div>
  );
}

export default DogPage;
