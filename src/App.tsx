import React from 'react';
import { Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './layout/Header';
import Register from './modules/Auth/Register';
import Login from './modules/Auth/Login';
import Home from './modules/Home/Home';
import Logout from './modules/Auth/Logout';
import SinglePost from './modules/SinglePost/SinglePost';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import './App.css';

export const history = createBrowserHistory();
const App: React.FC = () => {
  return (
    <div className='App'>
      <Router history={history}>
        <Header />
        <Switch>
          <PublicRoute exact path='/login' component={Login} />
          <PublicRoute exact path='/register' component={Register} />
          <PrivateRoute exact path='/logout' component={Logout} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/post/:id' component={SinglePost} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
