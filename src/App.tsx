import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/auth-context';
import { Auth, Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';

import {
  HOMEPAGE_PATH,
  CREATE_ACCOUNT_PATH,
  ABOUT_PATH,
  LETS_TALK_PATH,
  CARD_PATH,
  DASHBOARD_PATH,
  LOGIN_PATH,
  SMS_PATH,
  WALLET_PATH,
  ACTIVATE_ACCOUNT_PATH,
} from './constants/paths';
import PrivateRoute from './routes/private-route';
import Loader from './components/loader/loader';

const CreateAccount = lazy(
  () => import('./views/authenthication/createaccount/createaccount')
);
const ActivateCode = lazy(
  () => import('./views/activation-code-page/activation-code-page')
);
const AboutUs = lazy(() => import('./views/about/about'));
const Login = lazy(() => import('./views/authenthication/login/login'));
const LetsTalk = lazy(() => import('./views/letstalk/letstalk'));
const Card = lazy(() => import('./views/card/card'));
const Dashboard = lazy(() => import('./views/dashboard/dashboard'));
const Bulk = lazy(() => import('./views/bulk/bulk'));
const Wallet = lazy(() => import('./views/wallet/wallet'));

function App() {
  Amplify.configure(awsmobile);

  // >>New - Configuring Auth Module
  Auth.configure(awsmobile);

  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <Switch>
              <PrivateRoute exact path={HOMEPAGE_PATH} component={Dashboard} />
              <PrivateRoute exact path={DASHBOARD_PATH} component={Dashboard} />
              <Route path={LOGIN_PATH} component={Login} />
              <PrivateRoute
                path={ACTIVATE_ACCOUNT_PATH}
                component={ActivateCode}
              />
              <PrivateRoute path={CARD_PATH} component={Card} />
              <Route path={CREATE_ACCOUNT_PATH} component={CreateAccount} />
              <Route path={ABOUT_PATH} component={AboutUs} />
              <Route path={LETS_TALK_PATH} component={LetsTalk} />
              <PrivateRoute path={WALLET_PATH} component={Wallet} />
              <PrivateRoute path={SMS_PATH} component={Bulk} />
            </Switch>
          </Suspense>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
