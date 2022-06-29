import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/auth-context';
import { Auth, Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify'
import {
  CREATE_ACCOUNT_PATH,
  ABOUT_PATH,
  LETS_TALK_PATH,
  LOGIN_PATH,
  ACTIVATE_ACCOUNT_PATH,
  CONTACTS_PATH,
  PASSWORDFORGOT_PATH,
  SEND_SMS_PATH,
  PROFILEINFO_PATH,
  USERS_PATH,
  SUBSCRIPTION_PATH,
  PAYMENTHISTORY_PATH,
} from './constants/paths';
import PrivateRoute from './routes/private-route';
import Loader from './components/loader/loader';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import theme from './styles/theme';
import GlobalStyles from './styles/global-styles';
import { PaymentProvider } from './context/payment-context';

const CreateAccount = lazy(
  () => import('./views/authenthication/createaccount/createaccount')
);
const ActivateCode = lazy(
  () => import('./views/activation-code-page/activation-code-page')
);
const AboutUs = lazy(() => import('./views/about/about'));
const Login = lazy(() => import('./views/authenthication/login/login'));
const LetsTalk = lazy(() => import('./views/letstalk/letstalk'));
// const Card = lazy(() => import('./views/card/card'));
// const DashboardData = lazy(
//   () => import('./views/dashboard/dashboard-data/dashboard-data')
// );
// const Bulk = lazy(() => import('./views/bulk/bulk'));
// const Wallet = lazy(() => import('./views/wallet/wallet'));
const ContactData = lazy(() => import('./views/contacts/contacts'));
const PasswordForgot = lazy(
  () => import('./views/forgot-password/forgot-password')
);
const Users = lazy(() => import('./views/users/users'))
const ProfileData = lazy(() => import('./views/profile-info/profile-info'));
const SendSms = lazy(() => import('./views/sms-page/sms-page'))
// const HomePage = lazy(() => import('./views/home/main/main'))
const Subscription = lazy(() => import('./views/dashboard/subscription/subscription/subscription'))
// const DashboardC = lazy(() => import('./views/dashboard/dashboard-C-data/dashboard-C/home-dashboard'))
const BlogPost = lazy(() => import('./views/blog/blog-post/blog-post'))
const PaymentHistory = lazy(() => import('./views/payment-history/payment-history'))

function App() {
  Amplify.configure(awsmobile);

  // >>New - Configuring Auth Module
  Auth.configure(awsmobile);

  const queryClient = new QueryClient();
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <AuthProvider>
            <PaymentProvider>
              <Router>
                <Suspense fallback={<Loader />}>
                  <Switch>
                    <Route
                      exact
                      path={LOGIN_PATH}
                      component={Login}
                    />

                    <Route path={ACTIVATE_ACCOUNT_PATH} component={ActivateCode} />
                    <Route path={CREATE_ACCOUNT_PATH} component={CreateAccount} />
                    <Route path={ABOUT_PATH} component={AboutUs} />
                    <Route path={LETS_TALK_PATH} component={LetsTalk} />
                    <Route path={'/blog'} component={BlogPost} />
                    <Route path={PASSWORDFORGOT_PATH} component={PasswordForgot} />

                    <PrivateRoute path={SEND_SMS_PATH} component={SendSms} />
                    <PrivateRoute path={CONTACTS_PATH} component={ContactData} />
                    <PrivateRoute path={PROFILEINFO_PATH} component={ProfileData} />
                    <PrivateRoute path={USERS_PATH} component={Users} />
                    <PrivateRoute path={SUBSCRIPTION_PATH} component={Subscription} />
                    <PrivateRoute path={PAYMENTHISTORY_PATH} component={PaymentHistory} />
                    <Route path={LOGIN_PATH} component={Login} />
                  </Switch>
                </Suspense>
                <ToastContainer />
              </Router>
            </PaymentProvider>
          </AuthProvider>
        </MuiThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
