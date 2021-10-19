import React, {
  ReactElement,
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

type AuthContextProps = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  children?: any;
};

const AuthContext = createContext({});

const AuthProvider = (props: any): ReactElement => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const values: AuthContextProps = {
    isAuth,
    setIsAuth,
  };

  console.log(`context`, isAuth);

  return <AuthContext.Provider value={values} {...props} />;
};

const useAuth = (): AuthContextProps =>
  useContext(AuthContext) as AuthContextProps;

export { AuthProvider, useAuth };
