import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

import { createBrowserHistory } from 'history';
import './App.css';
import CreateAccount from './views/authenthication/createaccount/createaccount';
import AboutUsPage from './views/about/about';
import Login from './views/authenthication/login/login';
import LetsTalk from './views/letstalk/letstalk';

import {
  HOMEPAGE_PATH,
  LOGIN_PATH,
  CONTACT_PATH,
  CREATE_ACCOUNT_PATH,
  ABOUT_PATH,
  SIGNOUT_PATH,
} from './constants/paths';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path={ABOUT_PATH} component={AboutUsPage} />
          <Route exact path={CREATE_ACCOUNT_PATH} component={CreateAccount} />
          <Route path={HOMEPAGE_PATH} component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
