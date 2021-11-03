import { isEmpty } from 'lodash';
import { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from '../components/loader/loader';
import { LOGIN_PATH } from '../constants/paths';
import { useAuth } from '../context/auth-context';

type PrivateRouteProps = {
  component: ComponentType;
  exact?: boolean;
  path: string;
};

const PrivateRoute = ({ path, exact, component }: PrivateRouteProps) => {
  const { authState, isLoading } = useAuth();

  console.log('!isEmpty(authState)', !isEmpty(authState));
  if (isLoading) {
    return <Loader />;
  } else {
    const componentToRender = !isEmpty(authState)
      ? component
      : () => <Redirect to={LOGIN_PATH} />;

    return <Route path={path} exact={exact} component={componentToRender} />;
  }
};

export default PrivateRoute;
