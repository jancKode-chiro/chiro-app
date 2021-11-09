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
  CONTACTS_PATH,
  PASSWORDFORGOT_PATH,
  SEND_SMS_PATH,
  SLIDENAVIGATION_PATH,
  PROFILEDATA_PATH,
  USERS_PATH,
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
const DashboardData = lazy(
  () => import('./views/dashboard/dashboard-data/dashboard-data')
);
const Bulk = lazy(() => import('./views/bulk/bulk'));
const Wallet = lazy(() => import('./views/wallet/wallet'));
const ContactData = lazy(() => import('./views/contacts/contacts'));
const PasswordForgot = lazy(
  () => import('./views/forgot-password/forgot-password')
);
const Users = lazy(
  () => import('./views/users/users')
);
const ProfileData = lazy(() => import('./views/profile-info/profile-info'));

function App() {
  Amplify.configure(awsmobile);

  // >>New - Configuring Auth Module
  Auth.configure(awsmobile);

  const queryClient = new QueryClient();

  return (
    <div className='App'>
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
                <PrivateRoute path={SEND_SMS_PATH} component={SendSMS} />
                <PrivateRoute path={CONTACTS_PATH} component={ContactData} />
                <PrivateRoute path={PROFILEDATA_PATH} component={ProfileData} />
                <PrivateRoute path={SLIDENAVIGATION_PATH} component={SlideNavigation} />
                <PrivateRoute path={USERS_PATH} component={Users} />
                <Route path={PASSWORDFORGOT_PATH} component={PasswordForgot} />
              </Switch>
            </Suspense>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
