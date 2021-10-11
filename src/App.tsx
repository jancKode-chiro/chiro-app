import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import CreateAccount from './views/authenthication/createaccount/createaccount';
import AboutUsPage from './views/about/about';
import Login from './views/authenthication/login/login';
import LetsTalk from './views/letstalk/letstalk';
import Card from './views/card/card';
import Dashboard from './views/dashboard/dashboard';

import {
  HOMEPAGE_PATH,
  CREATE_ACCOUNT_PATH,
  ABOUT_PATH,
  LETS_TALK_PATH,
  CARD_PATH,
  DASHBOARD_PATH,
  LOGIN_PATH,
} from './constants/paths';
import CustomHeader from './components/header/header';
import { AuthProvider, useAuth } from './context/auth-context';
import PrivateRoute from './routes/private-route';

function App() {
  const { isAuth } = useAuth();

  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path={CARD_PATH} component={Card} />
            <Route exact path={DASHBOARD_PATH} component={Dashboard} />
            <Route exact path={CREATE_ACCOUNT_PATH} component={CreateAccount} />
            <Route exact path={ABOUT_PATH} component={AboutUsPage} />
            <Route exact path={LETS_TALK_PATH} component={LetsTalk} />
            <Route exact path={LOGIN_PATH} component={Login} />
            <Route exact path={HOMEPAGE_PATH} component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
