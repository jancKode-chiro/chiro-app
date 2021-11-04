import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/auth-context';
import { Auth, Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
import { QueryClient, QueryClientProvider } from 'react-query';

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
<<<<<<< HEAD
  CONTACTDATA_PATH,
  PASSWORDFORGOT_PATH,
=======
  MESSAGEDATA_PATH,
>>>>>>> added message data
} from './constants/paths';
import PrivateRoute from './routes/private-route';
import Loader from './components/loader/loader';

<<<<<<< HEAD
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
const DashboardData = lazy(
  () => import('./views/dashboard/dashboard-data/dashboard-data')
);
const Bulk = lazy(() => import('./views/bulk/bulk'));
const Wallet = lazy(() => import('./views/wallet/wallet'));
const ContactData = lazy(() => import('./views/contacts/contacts'));
const PasswordForgot = lazy(
  () => import('./views/forgot-password/forgot-password')
);
=======
import { AuthProvider } from './context/auth-context';

import { Auth, Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
import ActivateCode from './views/activation-code-page/activation-code-page';
import MessageData from './views/messagedata/messagedata';
>>>>>>> added message data

function App() {
  Amplify.configure(awsmobile);

  // >>New - Configuring Auth Module
  Auth.configure(awsmobile);

  const queryClient = new QueryClient();

  return (
    <div className='App'>
<<<<<<< HEAD
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Suspense fallback={<Loader />}>
              <Switch>
                <PrivateRoute
                  exact
                  path={HOMEPAGE_PATH}
                  component={DashboardData}
                />
                <PrivateRoute
                  exact
                  path={DASHBOARD_PATH}
                  component={DashboardData}
                />
                <Route path={LOGIN_PATH} component={Login} />
                <Route path={ACTIVATE_ACCOUNT_PATH} component={ActivateCode} />
                <PrivateRoute path={CARD_PATH} component={Card} />
                <Route path={CREATE_ACCOUNT_PATH} component={CreateAccount} />
                <Route path={ABOUT_PATH} component={AboutUs} />
                <Route path={LETS_TALK_PATH} component={LetsTalk} />
                <PrivateRoute path={WALLET_PATH} component={Wallet} />
                <PrivateRoute path={SMS_PATH} component={Bulk} />
                <PrivateRoute path={CONTACTDATA_PATH} component={ContactData} />
                <Route path={PASSWORDFORGOT_PATH} component={PasswordForgot} />
              </Switch>
            </Suspense>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
=======
      <AuthProvider>
        <Router>
          <Switch>
            <Route
              exact
              path={ACTIVATE_ACCOUNT_PATH}
              component={ActivateCode}
            />
            <Route exact path={CARD_PATH} component={Card} />
            <Route exact path={DASHBOARD_PATH} component={Dashboard} />
            <Route exact path={CREATE_ACCOUNT_PATH} component={CreateAccount} />
            <Route exact path={ABOUT_PATH} component={AboutUsPage} />
            <Route exact path={LETS_TALK_PATH} component={LetsTalk} />
            <Route exact path={LOGIN_PATH} component={Login} />
            <Route exact path={WALLET_PATH} component={Wallet} />
            <Route exact path={SMS_PATH} component={Bulk} />
            <Route exact path={LOGIN_PATH} component={Login} />
            <Route exact path={HOMEPAGE_PATH} component={Login} />
            <Route exact path={MESSAGEDATA_PATH} component={MessageData} />
          </Switch>
        </Router>
      </AuthProvider>
>>>>>>> added message data
    </div>
  );
}

export default App;
