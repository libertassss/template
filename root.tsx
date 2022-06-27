import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './src/container/home';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path='/subApp5' component={Home}></Route>
        <Redirect path='/' to='subApp5'></Redirect>
      </Switch>
    </>
  );
};

export default Root;
