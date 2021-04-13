
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './src/container/home';

const Root = () => {
    return <> 
    <Switch>
        <Route path="/home" component={Home}></Route>
        <Redirect path="/" to='home'></Redirect>
    </Switch>   
    </>
}

export default Root;

