import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Register from './Components/Landing/Register';
import Login from './Components/Landing/Login';
import Dashboard from './Components/Dashboard/Dashboard';

export default (
  <Switch>
    <Route path='/dashboard' component={Dashboard}/>
    <Route exact path='/' component={Landing} />
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
  </Switch>
)