import React, { ReactElement, ComponentType } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { LOGIN_PATH, DASHBOARD_PATH } from '../constants/paths';

import { isEmpty } from 'lodash';

interface PrivateRouteProps extends RouteProps {
  component: ComponentType;
}

export default function PrivateRoute(props: PrivateRouteProps): ReactElement {
  const { isAuth } = useAuth();

  // const localePath = isAuth ? DASHBOARD_PATH : LOGIN_PATH;

  const component = isAuth
    ? () => <Redirect to={DASHBOARD_PATH} />
    : () => null;

  return <Route path={props.path} exact={props.exact} component={component} />;
}
