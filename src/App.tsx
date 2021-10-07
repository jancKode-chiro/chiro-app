import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import CreateAccount from './views/authenthication/createaccount/createaccount';
import AboutUsPage from './views/about/about';
import Login from './views/authenthication/login/login';
import LetsTalk from './views/letstalk/letstalk';
import Card from './views/card/card';

import {
  HOMEPAGE_PATH,
  LOGIN_PATH,
  CREATE_ACCOUNT_PATH,
  ABOUT_PATH,
  LETS_TALK_PATH,
} from './constants/paths';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path={ABOUT_PATH} component={AboutUsPage} />
          <Route exact path={CREATE_ACCOUNT_PATH} component={CreateAccount} />
          <Route exact path={LETS_TALK_PATH} component={LetsTalk} />
          <Route path={LOGIN_PATH} component={Login} />
          <Route path={HOMEPAGE_PATH} component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
