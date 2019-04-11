import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Register from './Components/Landing/Register';
import Login from './Components/Landing/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Product from './Components/Product/Product'

export default (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
    <Route path='/shop/:shoe_id' component={Product} />
  </Switch>
)